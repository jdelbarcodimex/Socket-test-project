
import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Aquí estamos utilizando un formato similar que omite que tengamos que declarar 
 * textualmente que es cada cosa gracias a la Composition API.
 * 
 * En este store:
 * 
 *  refs() son propiedades de estado
 *  computed() son getters.
 *  function() son acciones.
 */

export const useValuesStore = defineStore('main', () => {
    const piniaWord = ref('soy pinia')

    function cutWord() {
        const len = piniaWord.value.length
        piniaWord.value = piniaWord.value.substring(0, len - 1)
    }


    return { piniaWord, cutWord }

})