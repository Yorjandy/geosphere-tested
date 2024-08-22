<script setup>
    import { ControllerOperations } from '@/Controller/ControllerOperations';
    
    //definimos los emits necesarios para establecer una comunicacion vertical ascendente
    const emit = defineEmits(["layerSelected","menuClose"]);
    //definimos una istancia de controllerOperations para obtener datos de las capas
    const controlleroperation = new ControllerOperations();
    //programamos el evento que lanzara el emit layerSelected
    function handleSelected(data){
        emit("layerSelected", data);
    }
    function handleClose(){
        emit("menuClose", "");
    }
    function handleExpand(sub){
        const submenu = document.getElementById(sub);
        submenu.classList.toggle("menu__sub--expand");
    }
</script>

<template>
<nav class="menu">
    <div class="menu__close">
        <img v-on:click="handleClose" class="close__btn" src="../../assets/views_assets/x-lg.svg" alt="close">
    </div>
    <div class="menu__btn-colspan" v-on:click="handleExpand('base')">
        <p class="btn-colspan__text">BaseLayers</p>
        <img class="btn-colspan__icon" src="../../assets/views_assets/caret-right.svg" alt="arrow">
    </div>
    <ul id="base" class="menu__sub">
        <li class="menu__sub__item" v-for="id in controlleroperation.getBaseLayers().getIdLayers()" v-bind:key="id">
           <a class="item__link" href="#" v-on:click="handleSelected(id)">
                <img src="../../assets/views_assets/layers.svg" alt="layers" class="link__icon">
                <p class="link__text"> {{ id }}</p>
           </a>
        </li>
    </ul>
    <div class="menu__btn-colspan" v-on:click="handleExpand('over')">
        <p class="btn-colspan__text">OverLayers</p>
        <img class="btn-colspan__icon" src="../../assets/views_assets/caret-right.svg" alt="arrow">
    </div>
    <ul id="over" class="menu__sub">
        <li class="menu__sub__item" v-for="id in controlleroperation.getOverlays().getIdLayers()" v-bind:key="id">
            <a href="#" class="item__link" v-on:click="handleSelected(id)">
                <img src="../../assets/views_assets/stack.svg" alt="layers" class="link__icon">
                <p class="link__text"> {{ id }}</p>
            </a>
        </li>
    </ul>
</nav>
</template>

<style>
    .menu{
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    .menu *{
        margin: 0 20px;
    }
    .menu__close{
        margin: 0;
        position: relative;
        margin-bottom: 40px;
    }
    .close__btn{
        position: absolute;
        top: 10px;
        right: 0px;
    }
    .close__btn:hover{
        cursor: pointer;
    }
    .menu__btn-colspan{
        margin: 0;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
        color: var(--aqua);
        background-color: var(--milk__yellow);
        padding: 7px 0;
    }
    .menu__btn-colspan{
        cursor: pointer;
    }
    .btn-colspan__icon{
        transform: rotate(90deg);
    }
    .menu__sub{
        display: none;
        transition: .2s ease-in-out;
    }
    .menu__sub--expand{
        display: block;
        transition: .2s ease-in-out;
    }
    .menu__sub__item{
        list-style: none;
        margin: 0;
    }
    .menu__sub__item:hover{
        border-bottom: 2px solid var(--pale__milk__orange);
    }
    .item__link{
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        color: var(--aqua);
        font-weight: 600;
    }
    
</style>