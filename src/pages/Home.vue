<script setup>
import { ref } from 'vue'


const allDetails = [
    { name: "Binguni", allocated: 5, edited: 2, nonEdited: 3 },
    { name: "Chamodi", allocated: 10, edited: 8, nonEdited: 2 },
    { name: "Charitha", allocated: 6, edited: 3, nonEdited: 3 },
    { name: "Duvini", allocated: 0, edited: 0, nonEdited: 0 },
    { name: "Duwini", allocated: 8, edited: 0, nonEdited: 8 },
    { name: "Ishara", allocated: 5, edited: 2, nonEdited: 3 },
    { name: "Kalpani", allocated: 5, edited: 2, nonEdited: 3 },
    { name: "Prabodha", allocated: 5, edited: 2, nonEdited: 3 },
    { name: "Sanduni", allocated: 5, edited: 2, nonEdited: 3 },
    { name: "Velency", allocated: 5, edited: 2, nonEdited: 3 }
];
const hoveredIndex = ref(null);




const handleMouseOver = (index) => {
    hoveredIndex.value = index
    console.log(`Mouse over item at index: ${index}`);
    
}

const handleMouseLeave = () => {
    hoveredIndex.value = null
}
</script>

<template>
    <div class="p-8 space-y-2 text-sm">
        <!-- Header Row -->
        <div class="bg-black text-white p-4 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
            <div class="text-white flex items-center w-full font-semibold text-lg bg-black">
                <div class="w-1/2 pl-2">Name</div>
                <div class="w-1/4 text-center">Allocated</div>
                <div class="w-1/4 text-center">Edited</div>
                <div class="w-1/4 text-center">Non-edited</div>
            </div>
        </div>

        <!-- Loop for Data Rows -->
        <div v-for="(item, index) in allDetails" :key="index"
        
            class="bg-white text-white p-4 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
            <div class="text-black flex items-center w-full">
                <div class="w-1/2 pl-2 font-bold text-gray-700 text-lg">{{ item.name }}</div>
                <div class="w-1/4 text-center font-bold text-gray-700 text-xl">{{ item.allocated }}</div>
                <div class="w-1/4 text-center font-bold text-gray-700 text-xl">{{ item.edited }}</div>
                <div class="w-1/4 text-center font-bold text-gray-700 text-xl">{{ item.nonEdited }}</div>
                <div class="relative">
                    <div class="ml-2 text-gray-500 text-xl cursor-pointer" @mouseover="handleMouseOver(index)"
                        @mouseleave="handleMouseLeave">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="hoveredIndex === index"
            class="absolute right-0 mt-2 w-40 bg-black text-black rounded-md shadow-md p-2 z-10"
            @mouseleave="handleMouseLeave">
            <div class="hover:bg-gray-100 px-2 py-1 cursor-pointer">Action 1</div>
            <div class="hover:bg-gray-100 px-2 py-1 cursor-pointer">Action 2</div>
        </div>
    </div>
</template>
