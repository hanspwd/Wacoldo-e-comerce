# Especificación de Requisitos de Software

*Proyecto: Tienda Web*

__Revisión*: \[99\.99\]*__

__\[Seleccionar fecha\]__

 Especificación de Requisitos según estándar de IEEE 830\.

Contenido

[Ficha del documento	3](#_Toc503382603)

[1\.  Introducción	4](#_Toc503382604)

[1\.1\.	Propósito	4](#_Toc503382605)

[1\.2\.	Ámbito del Sistema	4](#_Toc503382606)

[1\.3\.	Definiciones, Acrónimos y Abreviaturas	4](#_Toc503382607)

[1\.4\.	Referencias	4](#_Toc503382608)

[1\.5\.	Visión General del Documento	4](#_Toc503382609)

[2\.	Descripción General	5](#_Toc503382610)

[2\.1\.	Perspectiva del Producto	5](#_Toc503382611)

[2\.2\.	Funciones del Producto	5](#_Toc503382612)

[2\.3\.	Características de los Usuarios	5](#_Toc503382613)

[2\.4\.	Restricciones	5](#_Toc503382614)

[2\.5\.	Suposiciones y Dependencias	6](#_Toc503382615)

[2\.6\.	Requisitos Futuros	6](#_Toc503382616)

[3\.	Requisitos Específicos	7](#_Toc503382617)

[3\.1	Requisitos comunes de las interfaces	8](#_Toc503382618)

[3\.1\.1	Interfaces de usuario	8](#_Toc503382619)

[3\.1\.2	Interfaces de hardware	8](#_Toc503382620)

[3\.1\.3	Interfaces de software	8](#_Toc503382621)

[3\.1\.4	Interfaces de comunicación	8](#_Toc503382622)

[3\.2	Requisitos funcionales	9](#_Toc503382623)

[3\.3	Requisitos no funcionales	9](#_Toc503382624)

[3\.3\.1	Requisitos de rendimiento	9](#_Toc503382625)

[3\.3\.2	Seguridad	10](#_Toc503382626)

[3\.3\.3	Fiabilidad	10](#_Toc503382627)

[3\.3\.4	Disponibilidad	10](#_Toc503382628)

[3\.3\.5	Mantenibilidad	10](#_Toc503382629)

[3\.3\.6	Portabilidad	10](#_Toc503382630)

[3\.4	Otros Requisitos	10](#_Toc503382631)

<a id="_Toc33411057"></a>

# <a id="_Toc503382603"></a>Ficha del documento

__Fecha__

__Revisión__

__Autor__

__Modificación__

Documento validado por las partes en fecha: 

Por el cliente

Por la empresa suministradora

\[Firma\]

\[Firma\]

Sr\./Sra\. 

Sr\./Sra\.

# <a id="_Toc503382604"></a>1\.  Introducción

En esta sección se proporcionará una introducción a todo el documento de Especificación de Requisitos Software \(ERS\)\. Consta de varias subsecciones: propósito, ámbito del sistema, definiciones, referencias y visión general del documento\.

## <a id="_Toc503382605"></a>1\.1\.	Propósito

En esta subsección se definirá el propósito del documento ERS y se especificará a quién va dirigido el documento\.

 

## <a id="_Toc503382606"></a>1\.2\.	Ámbito del Sistema

En esta subsección:

•	Se podrá dar un nombre al futuro sistema\.

•	Se explicará lo que el sistema hará y lo que no hará\.

•	Se describirán los beneficios, objetivos y metas que se espera alcanzar con el futuro sistema\.

## <a id="_Toc503382607"></a>1\.3\.	Definiciones, Acrónimos y Abreviaturas

En esta subsección se definirán todos los términos, acrónimos y abreviaturas utilizadas en la ERS\.

ERS: Especificación de Requerimientos de Software\.

Comanda:  detalle del pedido del plato o menú\.

## <a id="_Toc503382608"></a>1\.4\.	Referencias

En esta subsección se mostrará una lista completa de todos los documentos referenciados en la ERS\.

 

## <a id="_Toc503382609"></a>1\.5\.	Visión General del Documento

En esta subsección se describe brevemente los contenidos y la organización del resto de la ERS\.

Este documento consta de un área de definición del negocio, un área de especificación de requisitos, se proporciona el detalle de los requerimientos a través de formularios de caso de uso como anexos\.

# <a id="_Toc503382610"></a>2\.	Descripción General

En esta sección se describen todos aquellos factores que afectan al producto y a sus requisitos\. No se describen los requisitos, sino su contexto__\.__ Esto permitirá definir con detalle los requisitos en la sección 3, haciendo que sean más fáciles de entender\.

Normalmente, esta sección consta de las siguientes subsecciones: Perspectiva del producto, funciones del producto, características de los usuarios, restricciones, factores que se asumen y futuros requisitos\.

## <a id="_Toc503382611"></a>2\.1\.	Perspectiva del Producto

Esta subsección debe relacionar el futuro sistema \(producto software\) con otros productos\. Si el producto es totalmente independiente de otros productos, también debe especificarse aquí\. Si la ERS define un producto que es parte de un sistema mayor, esta subsección relacionará los requisitos del sistema mayor con la funcionalidad del producto descrito en la ERS, y se identificarán las interfaces entre el producto mayor y el producto aquí descrito\. Se recomienda utilizar diagramas de bloques\.

## <a id="_Toc503382612"></a>2\.2\.	Funciones del Producto

En esta subsección de la ERS se mostrará un resumen, a grandes rasgos, de las funciones del futuro sistema\. Las funciones deberán mostrarse de forma organizada, y pueden utilizarse gráficos, siempre y cuando dichos gráficos reflejen las relaciones entre funciones y no el diseño del sistema\. \(Se recomienda algún tipo de Diagrama de los componentes del sistema\)

## <a id="_Toc503382613"></a>2\.3\.	Características de los Usuarios

Esta subsección describirá las características generales de los usuarios del producto, incluyendo nivel educacional, experiencia y experiencia técnica\. Además debes definir los Tipos de Usuarios con sus perfiles\.

Existirán 3 tipos de perfiles de usuarios, usuario administrador, cajero, cocinero……\.

El usuario cajero debe poseer conocimiento en uso de PC a nivel de usuario \.

El administrador  debe conocer el uso de Pc básico y Excel nivel medio\. 

## <a id="_Toc503382614"></a>2\.4\.	Restricciones

Esta subsección describirá aquellas limitaciones que se imponen sobre los desarrolladores del producto:

•	Políticas de la empresa\.

•	Limitaciones del hardware\.

•	Interfaces con otras aplicaciones\.

•	Operaciones paralelas\.

•	Funciones de auditoría\.

•	Funciones de control\.

•	Lenguaje\(s\) de programación\.

•	Protocolos de comunicación\.

•	Requisitos de habilidad\.

•	Criticidad de la aplicación\.

•	Consideraciones acerca de la seguridad\.

## <a id="_Toc503382615"></a>2\.5\.	Suposiciones y Dependencias

Esta subsección de la ERS describirá aquellos factores que, si cambian, pueden afectar a los requisitos\. Por ejemplo, los requisitos pueden presuponer una cierta organización de ciertas unidades de la empresa, o pueden presuponer que el sistema correrá sobre cierto sistema operativo\. Si cambian dichos detalles en la organización de la empresa, o si cambian ciertos detalles técnicos, como el sistema operativo, puede ser necesario revisar y cambiar los requisitos\.

## <a id="_Toc503382616"></a>2\.6\.	Requisitos Futuros

Esta subsección esbozará futuras mejoras al sistema, que podrán analizarse e implementarse en un futuro\.

 

# <a id="_Toc503382617"></a>3\.	Requisitos Específicos

Esta sección contiene los requisitos a un nivel de detalle suficiente como para permitir a los diseñadores diseñar un sistema que satisfaga estos requisitos, y que permita al equipo de pruebas planificar y realizar las pruebas que demuestren si el sistema satisface, o no, los requisitos\. Todo requisito aquí especificado describirá comportamientos externos del sistema, perceptibles por parte de los usuarios, operadores y otros sistemas\. Esta es la sección más larga e importante de la ERS\. Deberán aplicarse los siguientes principios:

•	El documento debería ser perfectamente legible por personas de muy distintas formaciones e intereses\.

•	Deberán referenciarse aquellos documentos relevantes que poseen alguna influencia sobre los requisitos\.

•	Todo requisito deberá ser unívocamente identificable mediante algún código o sistema de numeración adecuado\.

•	Lo ideal, aunque en la práctica no siempre realizable, es que los requisitos posean las siguientes características:

- __Corrección__: La ERS es correcta si y sólo si todo requisito que figura aquí \(y que será implementado en el sistema\) refleja alguna necesidad real\. La corrección de la ERS implica que el sistema implementado será el sistema deseado\.
- __No ambiguos__: Cada requisito tiene una sola interpretación\. Para eliminar la ambigüedad inherente a los requisitos expresados en lenguaje natural, se deberán utilizar gráficos o notaciones formales\. En el caso de utilizar términos que, habitualmente, poseen más de una interpretación, se definirán con precisión en el glosario\.
- __Completos__: Todos los requisitos relevantes han sido incluidos en la ERS\. Conviene incluir todas las posibles respuestas del sistema a los datos de entrada, tanto válidos como no válidos\.
- __Consistentes__: Los requisitos no pueden ser contradictorios\. Un conjunto de requisitos contradictorio no es implementable\.
- __Clasificados__: Normalmente, no todos los requisitos son igual de importantes\. Los requisitos pueden clasificarse por importancia \(esenciales, condicionales u opcionales\) o por estabilidad \(cambios que se espera que afecten al requisito\)\. Esto sirve, ante todo, para no emplear excesivos recursos en implementar requisitos no esenciales\.
- __Verificables__: La ERS es verificable si y sólo si todos sus requisitos son verificables\. Un requisito es verificable \(testeable\) si existe un proceso finito y no costoso para demostrar que el sistema cumple con el requisito\. Un requisito ambiguo no es, en general, verificable\. Expresiones como a veces, bien, adecuado, etc\. Introducen ambigüedad en los requisitos\. Requisitos como “en caso de accidente la nube tóxica no se extenderá más allá de 25Km" no es verificable por el alto costo que conlleva\.
- __Modificables__: La ERS es modificable si y sólo si se encuentra estructurada de forma que los cambios a los requisitos pueden realizarse de forma fácil, completa y consistente\. La utilización de herramientas automáticas de gestión de requisitos facilitan enormemente esta tarea\.
- __Trazables__: La ERS es trazable si se conoce el origen de cada requisito y se facilita la referencia de cada requisito a los componentes del diseño y de la implementación\. La trazabilidad hacia atrás indica el origen \(documento, persona, etc\.\) de cada requisito\. La trazabilidad hacia delante de un requisito R indica que componentes del sistema son los que realizan el requisito R\.

## <a id="_Toc503382618"></a>3\.1	Requisitos comunes de las interfaces

Descripción detallada de todas las entradas y salidas del sistema de software\.

### <a id="_Toc503382619"></a>3\.1\.1	Interfaces de usuario

Describir  los requisitos del interfaz de usuario para el producto\. Esto puede estar en la forma de descripciones del texto o pantallas del interfaz\. Por ejemplo posiblemente el cliente ha especificado el estilo y los colores del producto\. Describa exacto cómo el producto aparecerá a su usuario previsto\.

Las Interfaces de usuario serán páginas web con una distribución de menú superior y un área de contenido para mostrar la funcionalidad\. 

### <a id="_Toc503382620"></a>3\.1\.2	Interfaces de hardware

Especificar las características lógicas para cada interfaz entre el producto y los componentes de hardware del sistema\. Se incluirán características de configuración\.

El sistema se debe poder conectar a un dispositivo touch móvil\.

### <a id="_Toc503382621"></a>3\.1\.3	Interfaces de software

Indicar si hay que integrar el producto con otros productos de software\.

- Para cada producto de software debe especificarse lo siguiente:
- Descripción del producto software utilizado
- Propósito del interfaz
- Definición del interfaz: contiendo y formato

### <a id="_Toc503382622"></a>3\.1\.4	Interfaces de comunicación

Describir los requisitos de interfaces de comunicación si hay comunicaciones con otros sistemas y cuales son los protocolos de comunicación\.

## <a id="_Toc503382623"></a>3\.2	Requisitos funcionales

Definición de acciones fundamentales que debe realizar el software al recibir información, procesarla y producir resultados\. 

En ellas se incluye:

- Comprobación de validez de las entradas
- Secuencia exacta de operaciones
- Respuesta a situaciones anormales \(desbordamientos, comunicaciones, recuperación de errores\)
- Parámetros
- Generación de salidas
- Relaciones entre entradas y salidas \(secuencias de entradas y salidas, fórmulas para la conversión de información\)
- Especificación de los requisitos lógicos para la información que será  almacenada en base de datos \(tipo de información, requerido\)

Los requisitos funcionales pueden ser divididos en sub\-secciones\.

3\.2\.1	Requisito funcional 1

Requerimiento funcional 1: Crear pedido en el sistema\.

Actores: Garzón

Descripción: El garzón debe poder registrar los diferentes productos que pide el cliente, de acuerdo al menú disponible\.

3\.2\.2	Requisito funcional 2

3\.2\.3	Requisito funcional 3

3\.2\.4	Requisito funcional n

## <a id="_Toc503382624"></a>3\.3	Requisitos no funcionales

### <a id="_Toc503382625"></a>3\.3\.1	Requisitos de rendimiento

Especificación de los requisitos relacionados con la carga que se espera tenga que soportar el sistema\. Por ejemplo, el número de terminales, el número esperado de usuarios simultáneamente conectados, número de transacciones por segundo que deberá soportar el sistema, etc\.

Todos estos requisitos deben ser mesurables\. Por ejemplo, indicando “el 95% de las transacciones deben realizarse en menos de 1 segundo”, en lugar de “los operadores no deben esperar a que se complete la transacción”\.

### <a id="_Toc503382626"></a>3\.3\.2	Seguridad

Especificación de elementos que protegerán al software de accesos, usos y sabotajes maliciosos, así como de modificaciones o destrucciones maliciosas o accidentales\. Los requisitos pueden especificar:

- Empleo de técnicas criptográficas\.
- Registro de ficheros con “logs” de actividad\.
- Asignación de determinadas funcionalidades a determinados módulos\.
- Restricciones de comunicación entre determinados módulos\.
- Comprobaciones de integridad de información crítica\.

### <a id="_Toc503382627"></a>3\.3\.3	Fiabilidad

Especificación de los factores de fiabilidad necesaria del sistema\. Esto se expresa generalmente como el tiempo entre los incidentes permisibles, o el total de incidentes permisible\.

### <a id="_Toc503382628"></a>3\.3\.4	Disponibilidad

Especificación de los factores de disponibilidad final exigidos al sistema\. Normalmente expresados en % de tiempo en los que el software tiene que mostrar disponibilidad\.

### <a id="_Toc503382629"></a>3\.3\.5	Mantenibilidad

Identificación del tipo de mantenimiento necesario del sistema\. 

Especificación de quien debe realizar las tareas de mantenimiento, por ejemplo usuarios, o un desarrollador\.

Especificación de cuándo debe realizarse las tareas de mantenimiento\. Por ejemplo, generación de estadísticas de acceso semanales y mensuales\.

### <a id="_Toc503382630"></a>3\.3\.6	Portabilidad

Especificación de atributos que debe presentar el software para facilitar su traslado a otras plataformas u entornos\. Pueden incluirse:

- Porcentaje de componentes dependientes del servidor\.
- Porcentaje de código dependiente del servidor\.
- Uso de un determinado lenguaje por su portabilidad\.
- Uso de un determinado compilador o plataforma de desarrollo\.
- Uso de un determinado sistema operativo\.

## <a id="_Toc503382631"></a>3\.4	Otros Requisitos

Cualquier otro requisito\.

