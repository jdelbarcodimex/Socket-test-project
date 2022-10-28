<script setup>
import { ref, reactive, watch } from 'vue'
import { io } from "socket.io-client"
import { useValuesStore } from '../stores/useValuesStore';
import { storeToRefs } from 'pinia';
import TestComponent from './TestComponent.vue';

const socket = io('http://localhost:3001')

const props = defineProps({
  specialNumber: Number,
})


const values = reactive({ list: [1,4] })

const test = ref('render')

// llamas a todo el store asignandolo a una variable.
const store = useValuesStore()

// conservas la reactividad de las refs dentro del store
const { piniaWord } = storeToRefs(store)

// aqui sacamos las acciones del store. Como podemos ver
// es otra sintáxis
const { cutWord } = store

// funcion que de manera local modifica el array y emite un evento
const addSpecialValue = () => {
  console.log(props.specialNumber)
  values.list.push(props.specialNumber)
  socket.emit('modifyArray', values.list)
  
}


socket.on('ARRAY_CHANGED', (arr) => {
  console.log('llegó arreglo actualizado')
  // se actualiza por completo el arreglo
  values.list = arr
})


const cutStateWord = () => {
  cutWord()

  // si quieres agregar interactividad multijugador con Pinia
  // pues mejor hacer un wrapper. llamar a la función
}

// para el watcher, hay que hacer tracking específicamente del valor de la variable de estado.
watch( () => piniaWord.value, (word) => {
    console.log('cambio palabra. Envía a todos')
    socket.emit("cutWord", word)
  })

socket.on("WORD_CUT", (newWord) =>{
  piniaWord.value = newWord
})


</script> 

<template>
  <div>
    {{ values.list }}
  </div>
  
  <div>
    <!-- Las variables de estado como las refs
    no necesitan o no deben de tener el "ref.value" 
  cuando se renderiza.-->
    {{ piniaWord }}

     <TestComponent :word="piniaWord" />
  </div>
  
<div>
  <button @click="cutStateWord">Cut word</button>
  <button @click="addSpecialValue">Add special number</button>
</div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
