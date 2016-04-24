# Yaga - Base

## About

This is the core system for yaga. It serves the basic classes to handle
different webmapping frameworks with one abstraction layer.

This package includes the abstraction class itself, its driven
version (Driver) and abstractions for all basic spatial classes, like
map, layer point etc.

## How to install

This is an npm package on the organization repository `yaga` you can
install this package with npm:
```bash
npm install --save @yaga/base
```

*Note: You should not use the base package stand-alone! You should
prefer a driven version!*

## Architecture of yaga

### Abstraction to Driver

#### Options (-Interface)

Every yaga class should be started to implement with its options.
The options should always be implemented as single object. Only the
following datatypes are allowed for options:

* Boolean
* Number
* String
* Objects of datatypes listed here
* Arrays of datatypes listed here

Especially not allowed are:

* Methods on an options object

In the end it should be possible to make a stringified version of the
options and parse them back to the object and get an equal options
object.

It should be avoided to add other datatypes to an options object, but it
is not disallowed. Maybe you need to have something like a DOM-Element
in your parameters. But keep in mind, that you are not able anymore to
stringify your options JSON!

#### Interface

Your interface should always extend your options interface. If you do
so, you are able to clone an object simply passing it to your
constructor.

This interface have no restriction on methods or datatypes, but you
should prefer to use the [yaga simple API helpers](#yaga-simple-api).

#### Abstract Class

The abstract class should extends the
[abstraction class](#abstraction-class) and implements the above
described [interface](#interface).

#### Driven Class

A driver should implements the above described [interface](#interface)
like the abstraction itself, but it should extend the
[driver class](#driver-class) instead of the abstraction class

### Abstraction Class

An abstraction class describes a class without implementing it to a
given framework, like [leaflet](http://www.leafletjs.com).

For example a LatLng element have all abstract methods to calculate with
it, but you are not able to show it on a map, because only your
webmapping framework does so.

### Driver Class

A driven class connect the abstract description with a real
functionality (of a framework). Let's take the above explained example
of a LatLng class:

The driven version is able to interact with your specified framework,
but have also the possibilities of the abstract class.

### Yaga simple API

To use your abstractions in a defined way you should make use of the
simple API helpers.

It is not so nice to bind a call of these helpers to an object, this is
why we prefer to give the object as reference. Note that your reference
has to be a derived abstraction, because we need to have an
event-emitter.

The origin parameter helps to handle calls from different emitters.
For example you change to map center position, maybe your driven class
listens on a change position event of your target map. If this change
the position within your abstract class again it will loop infinitely.
The origin array determines that something has already called a method
that changes a value, and will not call again, if it is already in the
origin chain.

The simple API helpers serves you this basic methods
to handle data in your object:

* `getterHelper(target: Abstraction, property: string): any`: Returns the value of a given property on a given object.
* `setterHelper(target: Abstraction, property: string, value: any, origin?: any[]): Abstraction`: Sets a value on a given property of a given object and returns the object again.
* `adderHelper(target: Abstraction, property: string, value: any, origin?: any[]): Abstraction`: Add a value on a given property array of a given object and returns the object again.
* `removerHelper(target: Abstraction, property: string, value: any, origin?: any[]): Abstraction`: Removes a value from a given property array of a given object and returns the object again.
* `enableHelper(target: Abstraction, property: string, origin?: any[]): Abstraction`: Sets a given property to true of a given object and returns the object again.
* `disableHelper(target: Abstraction, property: string, origin?: any[]): Abstraction`: Sets a given property to false of a given object and returns the object again.

*There is also a test-factory module. This module serves an easy to
write and extend way of doing software-tests with methods that are
conform to the yaga simple api*

## Yaga in general
Yet another geo application - Geospatial on web with love

A geospatial web application for client- and server-side with components for Angular, Cordova and Node.js.

### About this project name
   
1. Yaga sounds like Draga and I love her!
2. Yaga = Yet another geo application
