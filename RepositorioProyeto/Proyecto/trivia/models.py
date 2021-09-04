from django.db import models

# Create your models here.

class Categoria(models.Model):
    nombre = models.CharField(max_length=20)
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = ('Categoria')    
        verbose_name_plural = ('Categorias')    
   
class Pregunta(models.Model):
    texto_pregunta = models.CharField(max_length=200)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    