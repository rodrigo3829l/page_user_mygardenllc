# Proyecto My Garden LLC - PWA

## 1. Descripción del Proyecto

>[!IMPORTANT]  
El proyecto consiste en la conversión de la página web existente de **My Garden LLC** en una **Progressive Web App (PWA)**, con el objetivo de mejorar la accesibilidad y la interacción de los usuarios, permitiendo que la aplicación sea instalable y funcione sin conexión a internet. Además, se han implementado **notificaciones web** para aumentar la participación de los usuarios.

**Objetivos principales:**

- Convertir la web en una **PWA** completamente funcional, optimizada para diferentes dispositivos.
- **Implementar notificaciones web** para mantener a los usuarios informados de actualizaciones y cambios importantes.
- **Optimizar el rendimiento**, accesibilidad y seguridad mediante auditorías de **Lighthouse**.
- Asegurar que la aplicación funcione sin conexión a internet a través de la correcta configuración del **service worker**.

## 2. Herramienta de Control de Versiones

>[!TIP]  
Se ha seleccionado **Git** junto con **GitHub** para el control de versiones. Este flujo de trabajo permite a los desarrolladores trabajar de manera distribuida y colaborar eficazmente. 

**Flujo de trabajo:**

- Todo el desarrollo se realiza en la rama **main** mediante un enfoque **centralizado**.  
- El equipo utiliza **Live Share** de Visual Studio para trabajar de forma colaborativa en tiempo real, lo que permite revisar y modificar el código simultáneamente, asegurando que los cambios que se suben a **main** ya han sido validados.
  
Además, **GitHub** está integrado con herramientas de **CI/CD** para la automatización de pruebas y despliegues, asegurando que cada cambio en **main** pase por un proceso de pruebas automatizadas.

## 3. Estrategia de Versionamiento

>[!NOTE]  
El proyecto sigue un esquema de **versionamiento semántico** utilizando la siguiente convención:

- **Major**: Cambios que rompen compatibilidad con versiones anteriores.
- **Minor**: Nuevas funcionalidades que no afectan la compatibilidad.
- **Patch**: Correcciones de bugs o mejoras que no alteran la funcionalidad.

Este enfoque garantiza que cada versión liberada del proyecto refleje claramente los cambios y el impacto que estos tienen en la aplicación.

**Revisión y fusión de ramas:**

- Dado que se sigue un flujo centralizado, los cambios se revisan en tiempo real mediante **Live Share** y se integran directamente en la rama **main**. No se trabaja con múltiples ramas de desarrollo, lo que agiliza el proceso de fusión y revisión.

## 4. Estrategia de Despliegue

>[!IMPORTANT]  
Se ha optado por un **despliegue directo**. Una vez que los cambios han sido probados y validados en el entorno de **staging**, se despliegan directamente en el entorno de producción.

### Entornos definidos:

- **Desarrollo**: Donde los desarrolladores colaboran utilizando **Live Share** para realizar cambios en tiempo real.
- **Staging**: Aquí se realizan las pruebas finales antes de mover los cambios a producción.
- **Producción**: Este es el entorno final, accesible para los usuarios, donde se despliega la versión estable de la aplicación.

Este enfoque asegura que los usuarios reciban actualizaciones rápidamente, sin pasos adicionales como despliegues **Canary** o **Blue-Green**.

## 5. Instrucciones para Clonar y Ejecutar el Proyecto

### Clonar el repositorio:

```bash
git clone https://github.com/rodrigo3829l/page_user_mygardenllc.git
```

### Instalar dependencias:

```bash
yarn install
```

### Ejecutar el proyecto localmente:

```bash
yarn serve
```

>[!CAUTION]  
Es necesario tener **yarn** instalado correctamente en el entorno local para ejecutar el proyecto sin problemas.

## 6. Proceso para la Creación y Seguimiento de Issues

>[!TIP]  
Se utiliza **Jira** para la creación, asignación y seguimiento de **issues** en el proyecto. El proceso es el siguiente:

1. **Creación del Issue**: Cada issue se crea con un título claro y una descripción detallada que define la tarea.
2. **Asignación**: Los issues se asignan a los miembros del equipo según su área de expertise. **Rodrigo** se encarga de las tareas más técnicas, como la configuración del **service worker** y la optimización de la PWA. **Avelina** gestiona tareas relacionadas con la implementación visual y el diseño de la interfaz de usuario.
3. **Seguimiento del Issue**: Los issues pasan por varios estados:
   - **To Do**: Tareas pendientes de empezar.
   - **In Progress**: Tareas en desarrollo.
   - **Review**: Tareas en revisión, donde se realizan pruebas de validación.
   - **Done**: Tareas completadas y aprobadas.

Este flujo asegura que cada miembro del equipo esté al tanto del progreso del proyecto y pueda priorizar adecuadamente sus tareas.

## 7. Estrategia de Despliegue de CI/CD

>[!NOTE]  
El proyecto utiliza una integración continua (**CI**) mediante **GitHub Actions**, que permite realizar pruebas automáticas de cada commit subido a la rama **main**. Una vez que el código pasa las pruebas, se despliega automáticamente al entorno de **staging** para realizar validaciones finales.

Si todas las pruebas en **staging** son exitosas, el código se despliega automáticamente al entorno de **producción**, asegurando que los usuarios reciban una versión estable de la aplicación.
