import { Map, control, marker } from "leaflet";
import { BaseLayers } from "@/model/BaseLayers";
import { OverLays } from "@/model/OverLays";
import { NotDataFoundException } from "@/Exceptions/NotDataFoundException";

//Declaracion de la clase controladora de nuestro proyecto
export class ControllerLayers{
    //declaracion de atributos
    __baselayers = new BaseLayers();
    __overlays = new OverLays();
    __mapcontent;
    //usaremos el constructor para inicializar el contenedor de mapas
    constructor(divMap){
        this.__mapcontent = new Map(divMap).setView([22.406 , -79.966] , 10);
    }
    //getter and setter
    getMapContent(){
        return this.__mapcontent;
    }
    getBaseLayers(){
        return this.__baselayers;
    }
    getOverLays(){
        return this.__overlays;
    }
    //metodo para crear un control de capas
    buildControlLayers(){
        let base = this.__baselayers.getTileLayersMap();
        let over = this.__overlays.getTileLayersMap();
        return control.layers(base,over);  
    }
    //metodo para crear una escala en el mapa
    buildControlScale(){
        return control.scale();
    }
    //metodo para encontrar la ubicacion del dispositivo del usuario
    findLocation(mapa){
        mapa.locate({setView : true, maxZoom : 13});
        mapa.on('locationfound', (e)=>{
            marker(e.latlng).bindPopup(`<h2>Location: </h2> <br> <p>latitud: ${e.latlng.lat}</p> <p>longitud: ${e.latlng.lng}</p>`).openPopup().addTo(mapa);
        })
    }
    //metodo para crear una lista iterable de objetos para las supercapas
    iterableListOverlays(){
        let list = [];
        let overids = this.__overlays.getIdLayers();
        for(let id of overids){
            let obj = {};
            obj.id = id;
            obj.overlay = this.__overlays.getTileLayer(id);
            list.push(obj);
        }
        return list;
    }
    //metodos para testeo (no son parte del codigo principal solo son para testing)
    //test de mensajes
    testFindLocation(mapa){
        mapa.on('click', (e)=>{
            marker(e.latlng).bindPopup(`<h2>Location: </h2> <br> <p>latitud: ${e.latlng.lat}</p> <p>longitud: ${e.latlng.lng}</p>`).openPopup().addTo(mapa);
        })
    }
}