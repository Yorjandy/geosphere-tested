<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        error:{
            type:Boolean,
            required:true
        },
        errortext:{
            type:String,
            required:true
        }
    })
    const emits = defineEmits(["close-error"]);

    function handleCloseError(){
        emits("close-error","");
    }
</script>

<template>
    <!--contenedor para mostrar errores-->
    <div class="error-container" v-show="(props.error)" v-on:click="handleCloseError">
        <span class="error-message">{{ props.errortext }}</span>
    </div>
</template>
    
<style scoped>
    .error-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 95px;
        background: rgba(60, 76, 104, 0.562);
        display: flex;
        align-items: center;
       justify-content: center;
    }
    .error-message{
        padding: 20px;
        background-color: white;
        border-radius: 40px;
        color: rgb(192, 44, 44);
    }
</style>