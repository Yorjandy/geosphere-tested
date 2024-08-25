import { expect,it,describe } from "vitest";
import { BaseLayers } from "@/model/BaseLayers";

//testing a clase BaseLayers
describe("testing: BaseLayers",()=>{
    //metodo: getIdLayers()
    it("getIdLayers: debe devolver una lista de strings", ()=>{
        const baselayers = new BaseLayers();
        //resultado es un array?
        expect(Array.isArray(baselayers.getIdLayers())).toBe(true);
        //los elementos del arreglo son strings
        baselayers.getIdLayers().forEach(id =>{
            expect(typeof id).toBe('string');
        })
    })
    //metodo: getLayerData()
    it("getLayerData: debe devolver un objeto de strings", ()=>{
        const baselayers = new BaseLayers();
        //devuelve un objeto?
        expect(typeof baselayers.getLayerData()).toBe("object");
        //sus valores son strings
        for(let elem of Object.values(baselayers.getLayerData())){
            expect(typeof elem).toBe('string');
        }
    })
    //metodo: getTileLayer()
    it("getTileLayer: debe devolver un objeto", ()=>{
        const baselayers = new BaseLayers();
        expect(typeof baselayers.getTileLayer()).toBe("object");
    })
    //metodo: getTileLayerMap()
    it("getTileLayerMap: debe devolver un objeto que almacene objetos", ()=>{
        const baselayers = new BaseLayers();
        expect(typeof baselayers.getTileLayersMap()).toBe("object");
        for(let obj of Object.values(baselayers.getTileLayersMap())){
            expect(typeof obj).toBe("object");
        }
    })
})