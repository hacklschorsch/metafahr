#!/bin/sh

# rsync to web server.

# exclude encouragement since changing ownership will break it. d'uh.
rsync -rv -e 'ssh -p 2020' --exclude '.git*' --exclude '.*.swp' --exclude 'encouragement.php' . fsesser@c2.cosetrain.com:metafahr-website.lnk/
