<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const dropdownIndex = ref(null)
const searchQuery = ref('')

// Reactive data
const details = ref([])
const callCenterPersonArray = ref([])

// Global counters (if needed, otherwise you can remove these)
const allocatedCount = ref(0)
const editedCount = ref(0)
const nonEditedCount = ref(0)

onMounted(() => {
    loadAllDataOfCallCenter()
        .then(() => loadCallCenterPerson())
        .catch(err => console.error('Error in onMounted loading:', err))
})

// const toggleDropdown = (index, person) => {
//     dropdownIndex.value = dropdownIndex.value === index ? null : index
//     console.log('Dropdown toggled for:', person)
//     loadDetails(person)
// }

const loadDetails = (person) => {
    console.log('Loading details for:', person)
    const payload = {
        callCenterPerson: person
    }
    store.dispatch('callCenterPersonDetailsStore/getDataToEditCallCenter', payload)
        .then(response => {
            console.log('Details loaded for:', person, response)
        })
        .catch(error => {
            console.error('Error loading details for:', person, error)
        })
}

const loadCallCenterPerson = () => {
    return store
        .dispatch('callCenterPersonDetailsStore/getCallCenterPerson')
        .then(response => {
            callCenterPersonArray.value = response
            getCountAllocated(callCenterPersonArray.value)
        })
        .catch(error => {
            console.error('Error loading call center persons:', error)
        })
}

const loadAllDataOfCallCenter = () => {
    // Return the Promise to chain .then()
    return store
        .dispatch('callCenterPersonDetailsStore/GetAllDataOfCallCenter')
        .then(response => {
            details.value.length = 0
            details.value.push(...response)
        })
        .catch(error => {
            console.error('Error loading all data of call center:', error)
        })
}

const getCountAllocated = (callCenterPersons) => {
    allocatedCount.value = 0
    editedCount.value = 0
    nonEditedCount.value = 0

    callCenterPersons.forEach(person => {
        const personDetails = details.value.filter(detail =>
            detail.Call_CentreID?.trim().toLowerCase() === person.Uname?.trim().toLowerCase()
        )

        const allocated = personDetails.length

        const edited = personDetails.filter(
            detail => detail.Current_status !== null && detail.Feedback !== null
        ).length

        const nonEdited = personDetails.filter(
            detail => detail.Current_status === null && detail.Feedback === null
        ).length

        // Count by Current_status types (adjust strings if needed)
        const positiveCount = personDetails.filter(d => d.Current_status === "Positive").length
        const negativeCount = personDetails.filter(d => d.Current_status === 'Negative').length
        const neutralCount = personDetails.filter(d => d.Current_status === 'Neutral').length

        // Assign counts to person object
        person.allocated = allocated
        person.edited = edited
        person.nonEdited = nonEdited

        person.positiveCount = positiveCount
        person.negativeCount = negativeCount
        person.neutralCount = neutralCount

        allocatedCount.value += allocated
        editedCount.value += edited
        nonEditedCount.value += nonEdited
    })
}


const filteredDetails = computed(() => {
    if (!searchQuery.value.trim()) return callCenterPersonArray.value
    return callCenterPersonArray.value.filter(d =>
        d.Uname.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})
</script>

<template>
    <div class="p-8 space-y-2 font-sans bg-gray-100 min-h-screen">
        <!-- Header Row -->
        <div class="bg-black text-white p-5 rounded-xl shadow-lg">
            <div class="grid grid-cols-7 gap-2 font-semibold text-base text-lg text-center">
                <div class="col-span-1 text-left pl-2">Name</div>
                <div>Allocated</div>
                <div>Edited</div>
                <div>Non-edited</div>
                <div class="text-green-400">Positive</div>
                <div class="text-red-400">Negative</div>
                <div class="text-yellow-400">Neutral</div>
            </div>
        </div>

        <!-- Data Rows -->
        <div v-for="(item, index) in filteredDetails" :key="index"
            class="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-0 duration-200 cursor-pointer"
            @click.stop="toggleDropdown(index, item.Uname)">
            <div class="grid grid-cols-7  gap-2 text-center items-center text-base font-medium text-gray-700">
                <div class="col-span-1 text-left pl-2 text-lg font-bold" :class="{
                    'text-red-800': item.positiveCount <= Math.floor(item.allocated * 0.25),
                    'text-green-700': item.positiveCount > Math.floor(item.allocated * 0.25)
                }">
                    {{ item.Uname }}
                    <svg
    v-if="item.positiveCount <= Math.floor(item.allocated * 0.25)"
    class="w-5 h-5 text-red-600 inline ml-1"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 16L4 6h12l-6 10z" />
  </svg>

  <!-- Green upward triangle SVG -->
  <svg
    v-else
    class="w-5 h-5 text-green-600 inline ml-1"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 4l6 10H4l6-10z" />
  </svg> </div>


                <div class="font-bold text-2xl">{{ item.allocated }}</div>
                <div class="font-bold text-2xl">{{ item.edited }}</div>
                <div class="font-bold text-2xl">{{ item.nonEdited }}</div>
                <div class="text-green-600 font-bold text-2xl ">{{ item.positiveCount }}</div>
                <div class="text-red-600 font-bold text-2xl">{{ item.negativeCount }}</div>
                <div class="text-yellow-600 font-bold text-2xl">{{ item.neutralCount }}</div>
            </div>

            <!-- Dropdown Details -->
            <!-- <div
        v-if="dropdownIndex === index"
        class="mt-4 bg-black text-white w-full p-5 rounded-lg shadow-lg transition"
      >
        <div class="text-lg font-semibold mb-2">
          Viewing Details for:
          <span class="text-yellow-300">{{ item.Uname }}</span>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center text-sm">
          <div>Allocated: {{ item.allocated }}</div>
          <div>Edited: {{ item.edited }}</div>
          <div>Non-Edited: {{ item.nonEdited }}</div>
          <div class="text-green-400">Positive: {{ item.positiveCount }}</div>
          <div class="text-red-400">Negative: {{ item.negativeCount }}</div>
          <div class="text-yellow-400">Neutral: {{ item.neutralCount }}</div>
        </div>
      </div> -->
        </div>
    </div>
</template>


<style scoped></style>
