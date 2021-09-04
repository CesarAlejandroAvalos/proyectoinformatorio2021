from django.contrib import admin
from  .models import Categoria, Pregunta

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre",)
    

class PreguntaAdmin(admin.ModelAdmin):
    list_display = ("texto_pregunta", "categoria")


admin.site.register(Categoria, CategoriaAdmin)    
admin.site.register(Pregunta, PreguntaAdmin)


 