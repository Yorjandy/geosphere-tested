import { describe, it, expect } from "vitest";
import { OverLays } from "@/model/OverLays";

//Testing a clase OverLays
describe("OverLays: Testing ", ()=>{
    //metodo getIdLayers()
    it("getIdLayers: debe devolver un arreglo de strings", ()=>{
        const overlays = new OverLays();
        expect(Array.isArray(overlays.getIdLayers())).toBe(true);
        overlays.getIdLayers().forEach(elem =>{
            expect(typeof elem).toBe("string");
        })
    })
    //metodo getLayerData()
    it("getLayerData: debe devolver un objeto cuyos valores sean strings", ()=>{
        const overlays = new OverLays();
        expect(typeof overlays.getLayerData("Provincias")).toBe("object");
        for(let value of Object.values(overlays.getLayerData("Provincias"))){
            expect(typeof value).toBe("string");
        }
    })
    //metodo getTileLayer()
    it("getTileLayer: debe devolver un objeto", ()=>{
        const overlays = new OverLays();
        expect(typeof overlays.getTileLayer("Provincias")).toBe("object");
    })
    //metodo getTileLayerMap()
    it("getTileLayerMap: debe devolver un objeto cuyos valores tambien sean objetos", ()=>{
        const overlays = new OverLays();
        expect(typeof overlays.getTileLayersMap()).toBe("object");
        for(let elem of Object.values(overlays.getTileLayersMap())){
            expect(typeof elem).toBe("object");
        }
    })
})