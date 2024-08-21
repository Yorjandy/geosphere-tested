import { OverLays } from "@/model/OverLays";
import { BaseLayers } from "@/model/BaseLayers";
import { LayerNotFoundException } from "@/Exceptions/LayerNotFoundException";

export class ControllerOperations{
    __overlays = new OverLays();
    __baselayers = new BaseLayers();
    //getter abd setter
    getOverlays(){
        return this.__overlays;
    }
    getBaseLayers(){
        return this.__baselayers;
    }
    //metodo para comparar dos capas pasadas por parametros
    compareLayers(lay1, lay2){
        if(lay1.options.layers === lay2.options.layers){
            if(lay1.options.format === lay2.options.format){
                return true;
            }
        }
        else{
            return false;
        }
    }
     //funcion para realizar las peticiones a geoserver en busca de los datos de una capa
     async getFeatureData(idlayer,bounds,width,height,pointX,pointY){
        let layerdata = this.__overlays.getLayerData(idlayer);
        //creamos la peticion a enviar
        let url =  `${layerdata.url}?service=WMS&version=1.1.1&request=GetFeatureInfo&layers=${layerdata.name}&bbox=${bounds}&width=${width}&height=${height}&srs=${layerdata.srs}&query_layers=${layerdata.name}&x=${parseInt(pointX)}&y=${parseInt(pointY)}`;
        //hacemos la peticion usando asincronia
        let response = await fetch(url);
        let data = await response.text();
        if(data){
            return data;
        }
        else{
            throw new LayerNotFoundException();
        }
    }
    //funcion para dado un id localizar de que capa se trata ya sea una capa base o una supercapa y devolver el tilelayer de esa capa
    findTileLayer( idtofind ){
        for(let id of this.__overlays.getIdLayers()){
            if(id === idtofind){
                return this.__overlays.getTileLayer(id);
            }
        }
        for(let id of this.__baselayers.getIdLayers()){
            if(id === idtofind){
                return this.__baselayers.getTileLayer(id);
            }
        }
        return -1;
    }
}