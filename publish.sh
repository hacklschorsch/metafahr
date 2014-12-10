#!/bin/sh

# rsync to web server.

rsync -rv -e 'ssh -p 2020' --exclude '.git*' . fsesser@c2.cosetrain.com:metafahr-website.lnk/
