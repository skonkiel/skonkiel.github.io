#!/bin/bash

# Find all HTML files
find . -name "*.html" -type f -exec sed -i '' \
  -e 's|highlight\.js/10\.2\.0/styles/github\.min\.css|highlight.js/11.11.1/styles/github.min.css|g' \
  -e 's|highlight\.js/10\.2\.0/styles/dracula\.min\.css|highlight.js/11.11.1/styles/dracula.min.css|g' \
  -e 's|highlight\.js/10\.2\.0/highlight\.min\.js|highlight.js/11.11.1/highlight.min.js|g' \
  -e 's|highlight\.js/10\.2\.0/languages/r\.min\.js|highlight.js/11.11.1/languages/r.min.js|g' \
  -e 's|integrity="sha512-TDKKr+IvoqZnPzc3l35hdjpHD0m+b2EC2SrLEgKDRWpxf2rFCxemkgvJ5kfU48ip+Y+m2XVKyOCD85ybtlZDmw=="|integrity="sha512-0wKZp6zxuXrKxrRJyBxhX++BA3qV/Sx6Yhh3X3KznlJgO71YK5y8O0dhDhdHmxFmeyGIqK5FU4VHAg0IEoGTkw=="|g' \
  -e 's|integrity="sha512-sC/BW4Dk1rUj6c/3jf8C4Ds7Kz4O1R6WHlgM/HEd5vJbqrFYz4sFYBBD3sPbKZCpkUGKiuXB/Qn6WOnqPnF7Ng=="|integrity="sha512-sC/BW4Dk1rUj6c/3jf8C4Ds7Kz4O1R6WHlgM/HEd5vJbqrFYz4sFYBBD3sPbKZCpkUGKiuXB/Qn6WOnqPnF7Ng=="|g' \
  -e 's|integrity="sha512-0aPQyyeZrWj9sCA46UlmWgKOP0mUipLQ6OZXu8l4IcExkis7+DPJqUXRGi6IHg0H6tQc/8NBl2tT7TLvuE/8QA=="|integrity="sha512-0aPQyyeZrWj9sCA46UlmWgKOP0mUipLQ6OZXu8l4IcExkis7+DPJqUXRGi6IHg0H6tQc/8NBl2tT7TLvuE/8QA=="|g' \
  -e 's|integrity="sha512-jH++0u6UqSvGxqhDtXWA5VVJMfn+Lj4KZbPEVBF/+Hj9sPXADxWmEGvhQdQXPXB+ZvZXVS0xHqwFxqgBRxPEw=="|integrity="sha512-jH++0u6UqSvGxqhDtXWA5VVJMfn+Lj4KZbPEVBF/+Hj9sPXADxWmEGvhQdQXPXB+ZvZXVS0xHqwFxqgBRxPEw=="|g' \
  {} \; 