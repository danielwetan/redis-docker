What is Redis?
- Open source in-memory data structure store, which can be used as a database and/or a cache and message broker
- NoSQL key/Value Store
- Support Multiple Data Structures

Redis Datatypes
- Strings
- Lists
- Sets
- Sorted Sets
- Hashes
- Bitmaps
- Hyperlogs
- Geospatial Indexes

Advantages of Redis
- Very Flexible
- No Schemas & Column Names
- Very fast
- Rich datatype support
- Caching & Disk Persistence

Redis cli
----
ping -> test conection
ECHO 'Hello World' -> print Hello World

#### Strings
SET foo 100 (SET key value)-> foo = 100
GET foo -> Get foo value
INCR foo -> Increment foo by 1
DECR foor -> Decrement foo by 1

EXISTS foo -> check foo existence (1 = exist, 0 = nil)
DEL foo -> delete foo key
FLUSHALL -> delete all redis key

SET server:name someserver -> key spaces
GET server:name -> key spaces

SET greeting "Hello World"
EXPIRE greeting 50 -> set greeting key to expires after 50 seconds
TTL greeting -> check how many second remaining before expires
SETEX greeting 50 "Hello World" -> set key value with 50 seconds expires time
PERSIST greeting -> make greeting key persistance

MSET key1 "Hello" key2 "World" -> Create multiple redis key
APPEND key1 " Daniel"-> append key1 value
RENAME key1 greeting -> rename key1 to greeting

#### Lists
LPUSH people "Adam" "Idris" "Daniel -> create lists
LRANGE people 0 -1 -> get all value from people list, order start by 0
LRANGE people 1 2 -> get value 1 to 2 from people list
RPUSH people "Ahmad" -> Add new value to end of the people lists
LLEN people -> Get total value of the people list
LPOP people -> remove first value of the people list
RPOP people  -> remove last value of the people list
LINSERT people BEFORE "Adam" "Umar" -> insert "Umar" before "Adam" value
LINSERT people AFTER "Daniel" "Budi" -> insert "Budi" after "Daniel" value


#### Sets
SADD cars "Ford" "Honda" "BMW" -> create sets
SISMEMBER cars "Ford" -> check is "Ford" exists in the cars sets (1=true, 0=false)
SMEMBERS cars -> get all members of cars sets
SCARD cars -> check how many elements in the cars sets
SMOVE cars mycars "Ford" -> move "Ford" from cars to mycars sets
SREM cars "BMW" -> remove "BMW" from cars sets

#### Sorted sets
ZADD users 1980 "Idris" 1975 "Adam" 1990 "Ahmad" -> Create sorted sets based on year
ZRANK users "Adam" -> Check "Adam " rank in the users sorted sets
ZRANGE users 0 -1 -> Get all users sorted list values
ZINCRBY users 10 "Idris" -> Increase Idris score value by 10

# Hashes
HSET user:daniel name "Daniel Saputra" -> Create hashes
HSET user:daniel email "danielwetan.io@gmail.com" -> Create another value for user:daniel
HGET user:daniel name -> Get the value of user:daniel name key
HGETALL user:daniel -> Get all value of the user:daniel
HMSET user:daniel name "Daniel" email "danielwetan.io@gmail.com" country "Indonesia" height "175"-> Create multiple value for user:daniel
HKEYS user:daniel -> Get all key for user:daniel
HVALS user:daniel -> Get all value for user:daniel
HINCRBY user:daniel height 10 -> Increase height by 10
HDEL user:daniel height -> Delete height key of user:daniel
HLEN user:daniel -> Number of key value of the user:daniel
DEL user:daniel -> Delete hashes
