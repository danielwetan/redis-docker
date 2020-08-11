const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = 6379; // default 6379

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
const setResponse = (username, repos) => {
  return `<h3>${username} has ${repos} Github repositories</h3>`
}

// Make request to Github for data
const getRepos = async (req, res, next) => {
  try {
    console.log('Fetching data...');
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json();
    // console.log(data);
    const repos = data.public_repos;
    // Set data to Redis
    // (key, seconds, value)
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
//
const getAll = async (req, res) => {
  try {
    console.log("Fetching all data...")
    const { username } = req.params
    const fetchData = await fetch(`https://api.github.com/users/${username}`)
    const data = await fetchData.json()
    const msg = {
      name: data.name,
      company: data.company,
      blog: data.blog
    }

    const entries = Object.entries(msg);
    const obj = Object.fromEntries(entries);
    console.log(obj);
    client.hmset('response' + username, obj)

    res.send(msg);
    console.log("From main router")
    // console.log(msg);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

// Cache middleware
const cache = (req, res, next) => {
  const { username } = req.params

  client.get(username, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  })
}

const cacheHmset = (req, res, next) => {
  const { username } = req.params
  client.hgetall(username, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
      console.log('From middleware')
    } else {
      next();
    }
  })
}

app.get('/repos/:username', getRepos)
app.get('/all/:username', getAll);

app.listen(PORT, () => console.log(`App listeing on PORT ${PORT}`))
