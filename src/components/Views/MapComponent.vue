<script setup>
//dependencias del componente
//import 'leaflet/dist/leaflet.css';
import { ControllerLayers } from '@/Controller/ControllerLayers';
import { onMounted, ref} from 'vue';
import { ControllerOperations } from '@/Controller/ControllerOperations';
import MenuComponent from './MenuComponent.vue';
import ErrorComponent from './ErrorComponent.vue';
import { popup } from 'leaflet';
//instancias de las clases de control
let mapController ;
let mapOperations = new ControllerOperations() ;
//instancias del contenedor de mapa y la capa actual
let mapContent;
let mapTilelayer;
//variable para guardar el valor de la supercapa actual cargada
let overlay = null;
//variable para guardar el valor de la supercapa actualmente retirada
let overlayremoved = null;
//variable para almacenar una funcion de evento del mapa
let getDataOverlay; 
//control de errores
let error = ref(false);
let errortext = ref('hola mundo soy un error');
//usamos mounted para inicializar todas las variables que necesitamos cuando se monta nuestro componente en la aplicacion
onMounted(()=>{
    //se crea la instancia de la clase controladora de capas
    mapController = new ControllerLayers("mapContent");
    //instanciamos mpContent con el contenedor de mapas de nustra clase de control
    mapContent = mapController.getMapContent();
    //agregamos una capa base inical a nuestro contenedor de mapas
    mapTilelayer = mapController.getBaseLayers().getTileLayer().addTo(mapContent);
    //agregamos un controlador de capas a nuestro mapa
    mapController.buildControlLayers().addTo(mapContent);
    //agregamos la escala
    mapController.buildControlScale().addTo(mapContent);
    //agregamos geolocalizacion
    mapController.findLocation(mapContent);
    //agregando eventos de mapa para capturar adicion de una supercapa a traves del control de mapas 
    //primero obtenemos la lista de supercapas para localizar la capa que produjo el evento
    let overlist = mapController.iterableListOverlays();
    //ahora agregamos el evento
    mapContent.on('overlayadd', (event)=>{
        //primero localizamos la capa que activo el evento y obtenemos su id
        for(let obj of overlist){
            if(mapOperations.compareLayers(obj.overlay,event.layer)){
                overlay = obj.id;
            }
        }
        //ahora si el id si nos fue devuelto agregamos el evento click a esa supercapa para obtener la informacion en el punto
        if(overlay != null){
            //si le funcion de evento fue agregada a otra capa anteriormente la retiramos para que solo escuche el evento de la capa mas recientemente cargada
            if(getDataOverlay != null){
                mapContent.off('click', getDataOverlay);
            }
            //ahora si agregariamos el evento a la capa cargada
            mapContent.on('click', getDataOverlay = (event)=>{
                let latlng = event.latlng;
                let point = mapContent.latLngToContainerPoint(latlng);
                let x = point.x;
                let y = point.y;
                let bounds = mapContent.getBounds().toBBoxString();
                let width = mapContent.getSize().x;
                let height = mapContent.getSize().y;
                //usamos el metodo para realizar la peticion
                mapOperations.getFeatureData(overlay,bounds,width,height,x,y).then((pointData) => {
                    let listpure = [];
                    let listimpure = pointData.split("\r\n");
                    for(let data of listimpure){
                        if(data.includes("=")){
                            listpure.push(data);
                        }
                    }
                    let datapure = "";
                    for(let data of listpure){
                        datapure +=data + "<br>";
                    }
                    popup().setLatLng(event.latlng).setContent(`<h2>Location Data</h2> <br> <p>${datapure}</p>`).openOn(mapContent);
                }).catch(() => {
                    error.value = true;
                    errortext.value = 'ha ocurrido un error a la hora de realizar el pedido de los datos al servidor';
                });
            })
        }
    })//fin de evento overlayadd
    //ahora agregaremos un evento overlayremove para asegurarnos de que al retirar una supercapa sea retirado tambien el evento getDataOverlay.
    mapContent.on('overlayremove', (event)=>{
         //primero localizamos la capa que activo el evento y obtenemos su id
         for(let obj of overlist){
            if(mapOperations.compareLayers(obj.overlay,event.layer)){
                overlayremoved = obj.id;
            }
        }
        //comprobamos que nos fue devuelto el id de dicha capa
        if(overlayremoved != null){
            //si la capa que fue removida es igual a la capa que fue cargada mas recientemente y que poseia el evento getDataOverlay, removeriamos dicho evento
            if(overlayremoved === overlay){
                mapContent.off('click', getDataOverlay);
            }
        }
    })//fin del evento overlayremove
})//fin del onMounted

//funciones manejadoras de eventos
//seleccionar capa
function changeLayer(data){
    let tilelayer = mapOperations.findTileLayer(data);
    mapTilelayer.remove();
    mapTilelayer = tilelayer.addTo(mapContent);
} 
//mostrar y ocultar menu
function handleMenu(){
    const menu = document.querySelector('.container__menu');
    const map = document.querySelector('.container__map');
    menu.classList.toggle("container__menu--toggle");
    map.classList.toggle("container__map--toggle");
}
//cerrar los mensajes de error
function handleClose(){
    error.value = false;
}
</script>

<template>
    <!--barra de navegacion-->
    <header class="navbar">
        <div v-on:click="handleMenu" class="navbar__menubtn">
            <img class="menubtn__icon" src="../../assets/views_assets/list.svg" alt="menu__logo">
            <div class="menubtn__text">menu</div>
        </div>
        <div class="navbar__logo">Geosphere</div>
    </header>
    <!--contenedor de la aplicacion-->
    <section class="container">
        <!--contenedor del menu-->
        <MenuComponent class="container__menu" v-on:menu-close="handleMenu" v-on:layer-selected="changeLayer" ></MenuComponent>
        <!--contenedor del mapa-->
        <div class="container__map" id="mapContent" ></div>
    </section>
    <!--contenedor de errores-->
    <ErrorComponent :error="error" :errortext="errortext" v-on:close-error="handleClose"/>
</template>

<style>
@font-face {
    font-family: "geologo";
    src: url("../../assets/views_assets/geologo.otf") format("opentype");
}
    /*creando las variables de color para el codigo*/
    :root{
        --aqua: #2d7274;
        --pale__aqua: #64bba1;
        --milk__yellow: #e9d7a7;
        --pale__milk__orange:#f29a7b;
        --milk__orange: #e77c71;
        --white : rgb(255, 255, 253);
    }
    .navbar{
        height: 15vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0px 30px;
        background: linear-gradient(45deg,var(--aqua),var(--white));
    }
    .navbar__logo{
        font-family:"geologo",sans-serif ;
        font-size: 50px;
        color: var(--aqua);
    }
    .navbar__menubtn{
        height: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px;
    }
    .navbar__menubtn:hover{
        cursor: pointer;
        border-bottom: solid 5px var(--pale__milk__orange);
    }
    .menubtn__icon{
        height: 40%;
    }
    .menubtn__text{
        color: var(--white);
        font-size: 40px;
    }
    .container{
        width: 100%;
        height: 85vh;
        display: flex;
    }
    .container__map{
        width: 80%;
        height: 100%;
    }
    .container__menu{
        width: 20%;
        height: 100%;
    }
    .container__map--toggle{
        width: 100%;
    }
    .container__menu--toggle{
        width: 0%;
    }
    @media screen and (max-width:800px){
        .navbar{
            height: 10vh;
        }
        .menubtn__text{
            display: none;
        }
        .navbar__logo{
            font-size: 35px;
        }
        .container{
            height: 90vh;
        }
        .container__map{
            width: 60%;
        }
        .container__menu{
            width: 40%;
        }
        .container__map--toggle{
        width: 100%;
        }
        .container__menu--toggle{
            width: 0%;
        }
    }
    @media screen and (max-width:400px){
        .navbar{
            height: 7vh;
        }
        .menubtn__text{
            display: none;
        }
        .navbar__logo{
            font-size: 25px;
        }
        .container{
            height: 93vh;
        }
        .container__map{
            width: 40%;
        }
        .container__menu{
            width: 60%;
        }
        .container__map--toggle{
        width: 100%;
        }
        .container__menu--toggle{
            width: 0%;
        }
    }
</style>