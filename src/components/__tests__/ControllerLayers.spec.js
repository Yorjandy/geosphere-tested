import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ControllerLayers } from "@/Controller/ControllerLayers";

//testeando la clase ControllerLayers
describe("testing: ControllerLayers", ()=>{
    //creando DOM de prueba para nuestra clase controladora
    beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: getMapContent
    it("getMapContent: debe devolver el objeto donde se renderizara el mapa", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(controller.getMapContent()).toBeDefined();
        expect(typeof controller.getMapContent()).toBe("object");
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
    //DOM de prueba
    beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: getBaseLayers
    it("getBaseLayer: debe devolver la intancia de la clase baselayers", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(controller.getBaseLayers()).toBeDefined();
        expect(typeof controller.getBaseLayers()).toBe("object");
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
     //DOM de prueba
     beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: getOverLays
    it("getOverLays: debe devolver la intancia de la clase overlays", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(controller.getOverLays()).toBeDefined();
        expect(typeof controller.getOverLays()).toBe("object");
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
     //DOM de prueba
     beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: buildControlLayers
    it("buildControlLayers: debe crear un control de capas y retornarlo", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(controller.buildControlLayers()).toBeDefined();
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
    //DOM de prueba
    beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: buildControlScale
    it("buildControlScale: debe crear una escala y retornarla", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(controller.buildControlScale()).toBeDefined();
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
    //DOM de prueba
    beforeEach(()=>{
        //se crea un div de prueba donde se cargara el mapa a testear
        const mapContent = document.createElement("div");
        //se le agrega un atributo id 
        mapContent.id = "map_testing";
        //se agrega el div al cuerpo del documento
        document.body.appendChild(mapContent);
    })
    //metodo: iterableListOverlays
    it("iterableListOverlays: debe retornar una lista de objetos", ()=>{
        const controller = new ControllerLayers("map_testing");
        expect(Array.isArray(controller.iterableListOverlays())).toBe(true);
        for(let elem of controller.iterableListOverlays()){
            expect(typeof elem.id).toBe("string");
            expect(typeof elem.overlay).toBe("object");
        }
    })
    afterEach(()=>{
        document.body.innerHTML = "";
    })
})  