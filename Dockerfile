FROM abiosoft/caddy:0.11.0
ADD ./dist /web
ADD Caddyfile /etc/Caddyfile
CMD ["-conf","/etc/Caddyfile"]
