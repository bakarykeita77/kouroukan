FROM php:8.2-apache

# Activer mod_rewrite
RUN a2enmod rewrite

# Copier le projet
COPY . /var/www/html/

# Permissions
RUN chown -R www-data:www-data /var/www/html

# Port utilisé par Render
EXPOSE 10000

# Configurer Apache avec le PORT fourni par Render
CMD ["bash", "-c", "sed -i \"s/^Listen .*/Listen ${PORT}/\" /etc/apache2/ports.conf && sed -i \"s/<VirtualHost \\*:80>/<VirtualHost *:${PORT}>/\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"]