//importacion de dependencias
import {BASE} from "../assets/BaseLayers";
import {ArrayEmptyException} from "../Exceptions/ArrayEmptyException";
import {LayerNotFoundException} from "../Exceptions/LayerNotFoundException";
import { tileLayer } from "leaflet";


//clase modelo para el manejo de las capas base
export class BaseLayers{
    __baselayers = BASE;

    //metodo para obtener una lista con los ids que identifican cada uno de los objetos de datos de peticion
    getIdLayers(){
        if(this.__baselayers.length === 0){
            throw new ArrayEmptyException();
        }
        let ids = [];
        for(let layer of this.__baselayers){
            ids.push(layer.id);
        }
        return ids;
    }
    //metodo para obtener los datos de peticion de una capa segun su id
    getLayerData(id = "default"){
        if(this.__baselayers.length === 0){
            throw new ArrayEmptyException();
        }
        for(let lay of this.__baselayers){
            if(id === lay.id){
                return lay;
            }
        }
        throw new LayerNotFoundException();
    }
    //metodo para devolver el tilelayer(capa lista para cargar en el mapa) de un objeto de datos de peticion
    getTileLayer(id = "default"){
        if(this.__baselayers.length === 0){
            throw new ArrayEmptyException();
        }
        for(let layer of this.__baselayers){
            if(id === layer.id){
                let tile =  tileLayer.wms(layer.url, {
                    layers: layer.name,
                    format: layer.format,
                    transparent: true,
                })
                console.log(tile);
                return tile;   
            }
        }
        throw new LayerNotFoundException();
    }
    //metodo para devolver un mapa de capas las cuales puedan ser usadas para crear un control de capas para la aolicacion
    getTileLayersMap(){
        if (this.__baselayers.length === 0){
            throw new ArrayEmptyException();
        }
        let baselayersmap = {};
        for(let layer of this.__baselayers){
            baselayersmap[layer.id] = this.getTileLayer(layer.id); 
        }
        return baselayersmap;
    }
}