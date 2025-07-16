FROM almalinux:8

# Install httpd
RUN yum install -y httpd

# Create web page using echo
RUN echo "<h1>Welcome to Mintra!</h1>" > /var/www/html/index.html

# Expose port 80
EXPOSE 80

# Start httpd service in foreground
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
