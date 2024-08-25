import { describe, it, expect } from "vitest";
import { ControllerOperations } from "@/Controller/ControllerOperations";

//testing de la clase ControllerOperations
describe("ControllerOperations testing", ()=>{
    //metodo: compareLayers
    it("compareLayers: pasadas dos capas como argumento debe devolver true si son iguales false en caso contrario", ()=>{
        const controller = new ControllerOperations();
        const layer = controller.getBaseLayers().getTileLayer();
        const layer2 = controller.getOverlays().getTileLayer("Provincias");
        expect(controller.compareLayers(layer,layer)).toBe(true);
        expect(controller.compareLayers(layer,layer2)).toBe(false);
    })
    //metodo: findTileLayer
    it("findTileLAyer: debe devolver on objeto  de capa en caso de encontrarlo; de lo contrario devolver -1", ()=>{
        const controller = new ControllerOperations();
        expect(controller.findTileLayer("default")).toBeDefined();
        expect(typeof controller.findTileLayer("default")).toBe("object");
        expect(controller.findTileLayer("notTileExits")).toBe(-1);
    })
    
})