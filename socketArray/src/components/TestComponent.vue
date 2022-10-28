
<template>

    <!-- ref que viene de store pasada como prop a este componente -->
    <h1>{{ props.word }}</h1>

    <!-- se importa el store se utiliza normal pero en un componente hijo 
    El valor de la variable de estado se comparte en todas las instancias que 
utilizan la variable que se encuentra guardada en el store. -->
    <h2>{{ piniaWord }}</h2>

</template>

<!-- los SFC (single file components) no necesitan de la función
explícita de "setup" porque ya está como atributo en script tag. -->
<script setup>

    import { storeToRefs } from 'pinia';
import { useValuesStore } from '../stores/useValuesStore';

    const store = useValuesStore()

    const { piniaWord }= storeToRefs(store)

    const props = defineProps({
        word: String,
    })

</script>