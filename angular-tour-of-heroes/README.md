# Introducción

## ¿Qué es Angular?

Angular es una plataforma de desarrollo, construida sobre TypeScript.

Como plataforma, Angular incluye:

* Un Framework basado en componentes para crear aplicaciones web escalables.
* Una colección de bibliotecas bien integradas que cubren una amplia variedad de funciones, incluido el enrutamiento, la administración de formularios, la comunicación cliente-servidor y más.
* Un conjunto de herramientas de desarrollo para ayudarle a desarrollar, crear, probar y actualizar su código.

Con Angular, estás aprovechando una plataforma que puede escalar desde proyectos de un solo desarrollador hasta aplicaciones de nivel empresarial.

## Prerequisitos

  * Instalar [Node.js LTS](https://nodejs.org/en).
  * Opcional: instalar [GIT](https://git-scm.com/).
  * Instalar Angular CLI: `npm install -g @angular/cli`.
  * Instalar un entorno de desarrollo integrado (IDE), recomiendo [Visual Studio Code](https://code.visualstudio.com/).
  * Opcional: pero recomendado, instalar [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

## Clase 01

### Iniciar Proyecto
  * `ng new angular-tour-of-heroes`.
  * `cd angular-tour-of-heroes`.
  * `ng serve` o `ng serve --open` (la opción `--open` abre un navegador en [http://localhost:4200/](http://localhost:4200/)).
  * Navegar a la URL [http://localhost:4200/](http://localhost:4200/).

## Proyecto 01 Tour de Heroes

El siguiente diagrama ilustra las opciones de navegación y diferentes secciones que construiremos.

![Arquitectura](https://angular.io/generated/images/guide/toh/nav-diagram.png)

### Generación de Código

Ejecutar `ng generate component nombre-componente` para generar un nuevo componente. También pueden utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build/Compile
Ejecuten `ng build` para la generación del proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`.
