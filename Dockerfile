FROM php:8.2-apache

# Active mod_rewrite si tu utilises des URLs propres (facultatif mais courant)
RUN a2enmod rewrite

# Copie tout le contenu du site dans le dossier servi par Apache
COPY . /var/www/html/

# Ajuste les permissions
RUN chown -R www-data:www-data /var/www/html

# Apache écoute par défaut sur le port 80
EXPOSE 80

# Configure Apache pour écouter sur le port fourni par Render
RUN sed -i "s/80/\${PORT:-80}/g" /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf