import { OVER } from "../assets/OverLays";
import { ArrayEmptyException } from "@/Exceptions/ArrayEmptyException";
import { LayerNotFoundException } from "@/Exceptions/LayerNotFoundException";
import { tileLayer } from "leaflet";

export class OverLays{
    __overlays = OVER;

    //metodo para recuperar los id de las supercapas
    getIdLayers(){
        if(this.__overlays.length === 0){
            throw new ArrayEmptyException();
        }
        let overlays = [];
        for(let over of this.__overlays){
            overlays.push(over.id);
        }
        return overlays;
    }
    //metodo para devolver los datos de peticion de una supercapa segun su id
    getLayerData(id){
        if(this.__overlays.length === 0){
            throw new ArrayEmptyException();
        }
        for(let over of this.__overlays){
            if(id === over.id){
                return over;
            }
        }
        throw new LayerNotFoundException();
    }
    //metodo para obtener una supercapa ya lista para cargar segun su id
    getTileLayer(id){
        if(this.__overlays.length === 0){
            throw new ArrayEmptyException();
        }
        for(let over of this.__overlays){
            if(id === over.id){
                let tile = tileLayer.wms(over.url, {
                    layers: over.name,
                    format: over.format,
                    transparent: true
                })
                console.log(tile);
                return tile;
            }
        }
        throw new LayerNotFoundException();
    }
    //metodo para obtener un mapa de supercapas para ser usadas en el control de capas
    getTileLayersMap(){
        if(this.__overlays.length === 0){
            throw new ArrayEmptyException();
        }
        let oversmap = {};
        for(let over of this.__overlays){
            oversmap[over.id] = this.getTileLayer(over.id);
        }
        return oversmap;
    }
}