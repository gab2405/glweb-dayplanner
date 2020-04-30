<template>
  <section class="content-section" id="Tasks">
    <div class="container">
      {{msg}}
      <div class="card">
        <h1>Aufgaben</h1>
        <Accordion>
          <template v-slot:button>
            <div class="create-button-wrap">
              <svg
                class="create"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#000000">
                    <path
                      d="M20.64,6.88v158.24h96.32c0.02688,0.01344 0.08063,-0.01344 0.1075,0c5.73781,4.3 12.83281,6.88 20.5325,6.88c18.96031,0 34.4,-15.43969 34.4,-34.4c0,-14.05562 -8.53281,-26.16281 -20.64,-31.4975v-99.2225zM27.52,13.76h116.96v90.1925c-2.23062,-0.45687 -4.515,-0.7525 -6.88,-0.7525c-7.69969,0 -14.79469,2.58 -20.5325,6.88h-48.2675v6.88h41.3875c-4.35375,5.76469 -6.9875,12.88656 -6.9875,20.64c0,7.75344 2.63375,14.87531 6.9875,20.64h-82.6675zM44.72,48.16v6.88h13.76v-6.88zM68.8,48.16v6.88h58.48v-6.88zM44.72,68.8v6.88h13.76v-6.88zM68.8,68.8v6.88h58.48v-6.88zM44.72,89.44v6.88h13.76v-6.88zM68.8,89.44v6.88h58.48v-6.88zM44.72,110.08v6.88h13.76v-6.88zM137.6,110.08c15.23813,0 27.52,12.28188 27.52,27.52c0,15.23813 -12.28187,27.52 -27.52,27.52c-15.23812,0 -27.52,-12.28187 -27.52,-27.52c0,-15.23812 12.28188,-27.52 27.52,-27.52zM134.16,120.4v13.76h-13.76v6.88h13.76v13.76h6.88v-13.76h13.76v-6.88h-13.76v-13.76z"
                    />
                  </g>
                </g>
              </svg>
              <span>Neu</span>
            </div>
            <button class="sec close">x</button>
          </template>
          <form class="create-form">
            <input type="text" v-model="newTask.title" placeholder="Titel" required />
            <input type="text" v-model="newTask.description" placeholder="Beschreibung" />
            <label class="custom-select">
              <select v-model="newTask.category_id">
                <option value selected disabled>Kategorie</option>
                <option v-for="c in sortedCategories" :key="c._id" :value="c._id">{{c.title}}</option>
              </select>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.mon" /> Montag
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.tue" /> Dienstag
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.wed" /> Mittwoch
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.thu" /> Donnerstag
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.fri" /> Freitag
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.sat" /> Samstag
              <span class="checkmark"></span>
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="newTask.dates.sun" /> Sonntag
              <span class="checkmark"></span>
            </label>
            <label class="flex-label">
              <input type="date" v-model="newTask.dates.startOn" /> von (Datum)
            </label>
            <label class="flex-label">
              <input type="date" v-model="newTask.dates.endOn"> bis (Datum)
            </label>
            <label class="flex-label">
              <input type="number" v-model="newTask.priority" min="1" max="3" /> Priorität
            </label>
            <button @click="createTask">
              <span>Aufgabe erstellen</span>
            </button>
          </form>
        </Accordion>
        <div class="list-item task-item" v-for="t in sortedTasks" :key="t._id">
          <p>{{t.title}}</p>
          <router-link :to="`/task/edit/${t._id}`" class="link-box edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 172 172"
              style=" fill:#000000;"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none" />
                <g fill="#000000">
                  <path
                    d="M154.0475,6.88c-1.76031,0.16125 -3.56094,0.67188 -5.375,1.29c-4.44781,1.51844 -9.23156,4.15219 -14.19,7.095l-1.935,-2.0425c-0.41656,-0.41656 -0.94062,-0.71219 -1.505,-0.86c0,0 -1.19594,-0.29562 -3.3325,-0.5375c-2.13656,-0.24187 -5.16,-0.33594 -8.7075,0.215c-7.08156,1.10188 -16.51469,4.68969 -26.1225,14.2975c-9.3525,9.3525 -14.835,17.50906 -18.49,23.865c-3.655,6.35594 -5.65719,10.8575 -7.6325,13.0075c-3.14437,3.42656 -7.2025,1.6125 -7.2025,1.6125c-1.74687,-0.73906 -3.77594,0.08063 -4.515,1.8275c-0.73906,1.74688 0.08063,3.77594 1.8275,4.515c0,0 8.82844,3.44 14.9425,-3.225c3.3325,-3.62812 5.14656,-8.29094 8.6,-14.2975c3.45344,-6.00656 8.41188,-13.46437 17.3075,-22.36c8.65375,-8.64031 16.60875,-11.56969 22.36,-12.47c5.34813,-0.83312 7.955,0.09406 8.385,0.215l0.3225,0.3225c-7.83406,6.16781 -26.20312,21.15063 -45.9025,40.85c-26.015,26.015 -55.685,61.5975 -55.685,61.5975c-0.51062,0.645 -0.77937,1.43781 -0.7525,2.2575c-6.46344,9.54063 -10.105,17.46875 -12.04,23.1125c-1.23625,3.61469 -1.78719,6.00656 -2.0425,7.6325l-4.6225,4.515c-1.37062,1.37063 -1.37062,3.57438 0,4.945c1.37063,1.37063 3.57438,1.37063 4.945,0l4.515,-4.6225c1.62594,-0.25531 4.01781,-0.80625 7.6325,-2.0425c5.65719,-1.935 13.6525,-5.53625 23.22,-12.04c0.77938,0 1.53188,-0.26875 2.15,-0.7525c0,0 35.5825,-29.67 61.5975,-55.685c24.98031,-24.98031 42.07281,-47.55531 43.43,-49.3425c0.20156,-0.18812 0.38969,-0.40312 0.5375,-0.645c0.04031,-0.04031 0.06719,-0.06719 0.1075,-0.1075c0.04031,-0.04031 0.06719,-0.06719 0.1075,-0.1075c0.13438,-0.20156 0.24188,-0.41656 0.3225,-0.645c3.13094,-5.21375 5.92594,-10.27969 7.525,-14.9425c0.83313,-2.41875 1.37063,-4.74344 1.29,-7.095c-0.08062,-2.35156 -0.90031,-4.87781 -2.6875,-6.665c-1.78719,-1.78719 -4.31344,-2.60687 -6.665,-2.6875c-0.59125,-0.02687 -1.12875,-0.05375 -1.72,0zM155.5525,13.76c1.08844,0.04031 1.47813,0.29563 1.935,0.7525c0.45688,0.45688 0.71219,0.84656 0.7525,1.935c0.04031,1.08844 -0.20156,2.6875 -0.86,4.6225c-0.99437,2.88906 -2.96969,6.49031 -5.16,10.32l-11.61,-11.61c3.82969,-2.19031 7.43094,-4.16562 10.32,-5.16c1.935,-0.65844 3.53406,-0.90031 4.6225,-0.86zM134.6975,23.65l13.6525,13.76c-2.48594,3.27875 -17.76437,23.24688 -41.3875,46.87c-23.55594,23.55594 -54.22031,49.3425 -59.2325,53.535l-13.545,-13.545c4.1925,-5.01219 29.97906,-35.67656 53.535,-59.2325c23.69031,-23.69031 43.77938,-38.96875 46.9775,-41.3875zM30.4225,128.57l13.0075,13.0075c-8.42531,5.54969 -15.56062,8.86875 -20.425,10.535c-2.80844,0.9675 -2.83531,0.81969 -4.1925,1.075c0.25531,-1.35719 0.1075,-1.38406 1.075,-4.1925c1.66625,-4.86437 4.98531,-11.99969 10.535,-20.425z"
                  />
                </g>
              </g>
            </svg>
          </router-link>
          <div class="link-box delete">
            <Accordion>
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 172 172"
                  style=" fill:#000000;"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style="mix-blend-mode: normal"
                  >
                    <path d="M0,172v-172h172v172z" fill="none" />
                    <g fill="#000000">
                      <path
                        d="M30.96,13.76c-9.45834,0 -17.2,7.74166 -17.2,17.2v110.08c0,9.45834 7.74166,17.2 17.2,17.2h110.08c9.45834,0 17.2,-7.74166 17.2,-17.2v-110.08c0,-9.45834 -7.74166,-17.2 -17.2,-17.2zM30.96,20.64h110.08c5.73958,0 10.32,4.58042 10.32,10.32v110.08c0,5.73958 -4.58042,10.32 -10.32,10.32h-110.08c-5.73958,0 -10.32,-4.58042 -10.32,-10.32v-110.08c0,-5.73958 4.58042,-10.32 10.32,-10.32zM57.47219,52.60781l-4.86437,4.86437l28.52781,28.52781l-28.52781,28.52781l4.86437,4.86437l28.52781,-28.52781l28.52781,28.52781l4.86437,-4.86437l-28.52781,-28.52781l28.52781,-28.52781l-4.86437,-4.86437l-28.52781,28.52781z"
                      />
                    </g>
                  </g>
                </svg>
              </template>
              <p>{{t.title}} wirklich löschen?</p>
              <div class="button-wrap">
                <button class="sec close">zurück</button>
                <button class="delete" @click="deleteTask(t._id)">Löschen</button>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      <div class="card">
        <h1>Kategorien</h1>
        <Accordion>
          <template v-slot:button>
            <!-- <button class="new"></button> -->
            <div class="create-button-wrap">
              <svg
                class="create"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#000000">
                    <path
                      d="M20.64,6.88v158.24h96.32c0.02688,0.01344 0.08063,-0.01344 0.1075,0c5.73781,4.3 12.83281,6.88 20.5325,6.88c18.96031,0 34.4,-15.43969 34.4,-34.4c0,-14.05562 -8.53281,-26.16281 -20.64,-31.4975v-99.2225zM27.52,13.76h116.96v90.1925c-2.23062,-0.45687 -4.515,-0.7525 -6.88,-0.7525c-7.69969,0 -14.79469,2.58 -20.5325,6.88h-48.2675v6.88h41.3875c-4.35375,5.76469 -6.9875,12.88656 -6.9875,20.64c0,7.75344 2.63375,14.87531 6.9875,20.64h-82.6675zM44.72,48.16v6.88h13.76v-6.88zM68.8,48.16v6.88h58.48v-6.88zM44.72,68.8v6.88h13.76v-6.88zM68.8,68.8v6.88h58.48v-6.88zM44.72,89.44v6.88h13.76v-6.88zM68.8,89.44v6.88h58.48v-6.88zM44.72,110.08v6.88h13.76v-6.88zM137.6,110.08c15.23813,0 27.52,12.28188 27.52,27.52c0,15.23813 -12.28187,27.52 -27.52,27.52c-15.23812,0 -27.52,-12.28187 -27.52,-27.52c0,-15.23812 12.28188,-27.52 27.52,-27.52zM134.16,120.4v13.76h-13.76v6.88h13.76v13.76h6.88v-13.76h13.76v-6.88h-13.76v-13.76z"
                    />
                  </g>
                </g>
              </svg>
              <span>Neu</span>
            </div>
            <button class="sec close">x</button>
          </template>
          <form @click.prevent="createCat" class="create-form">
            <input type="text" v-model="newCategory.title" placeholder="Titel" required />
            <button type="submit">
              <span>Kategorie erstellen</span>
            </button>
          </form>
        </Accordion>
        <div class="list-item category-item" v-for="c in sortedCategories" :key="c._id">
          <p>{{c.title}}</p>
          <router-link :to="`/category/edit/${c._id}`" class="link-box edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 172 172"
              style=" fill:#000000;"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none" />
                <g fill="#000000">
                  <path
                    d="M154.0475,6.88c-1.76031,0.16125 -3.56094,0.67188 -5.375,1.29c-4.44781,1.51844 -9.23156,4.15219 -14.19,7.095l-1.935,-2.0425c-0.41656,-0.41656 -0.94062,-0.71219 -1.505,-0.86c0,0 -1.19594,-0.29562 -3.3325,-0.5375c-2.13656,-0.24187 -5.16,-0.33594 -8.7075,0.215c-7.08156,1.10188 -16.51469,4.68969 -26.1225,14.2975c-9.3525,9.3525 -14.835,17.50906 -18.49,23.865c-3.655,6.35594 -5.65719,10.8575 -7.6325,13.0075c-3.14437,3.42656 -7.2025,1.6125 -7.2025,1.6125c-1.74687,-0.73906 -3.77594,0.08063 -4.515,1.8275c-0.73906,1.74688 0.08063,3.77594 1.8275,4.515c0,0 8.82844,3.44 14.9425,-3.225c3.3325,-3.62812 5.14656,-8.29094 8.6,-14.2975c3.45344,-6.00656 8.41188,-13.46437 17.3075,-22.36c8.65375,-8.64031 16.60875,-11.56969 22.36,-12.47c5.34813,-0.83312 7.955,0.09406 8.385,0.215l0.3225,0.3225c-7.83406,6.16781 -26.20312,21.15063 -45.9025,40.85c-26.015,26.015 -55.685,61.5975 -55.685,61.5975c-0.51062,0.645 -0.77937,1.43781 -0.7525,2.2575c-6.46344,9.54063 -10.105,17.46875 -12.04,23.1125c-1.23625,3.61469 -1.78719,6.00656 -2.0425,7.6325l-4.6225,4.515c-1.37062,1.37063 -1.37062,3.57438 0,4.945c1.37063,1.37063 3.57438,1.37063 4.945,0l4.515,-4.6225c1.62594,-0.25531 4.01781,-0.80625 7.6325,-2.0425c5.65719,-1.935 13.6525,-5.53625 23.22,-12.04c0.77938,0 1.53188,-0.26875 2.15,-0.7525c0,0 35.5825,-29.67 61.5975,-55.685c24.98031,-24.98031 42.07281,-47.55531 43.43,-49.3425c0.20156,-0.18812 0.38969,-0.40312 0.5375,-0.645c0.04031,-0.04031 0.06719,-0.06719 0.1075,-0.1075c0.04031,-0.04031 0.06719,-0.06719 0.1075,-0.1075c0.13438,-0.20156 0.24188,-0.41656 0.3225,-0.645c3.13094,-5.21375 5.92594,-10.27969 7.525,-14.9425c0.83313,-2.41875 1.37063,-4.74344 1.29,-7.095c-0.08062,-2.35156 -0.90031,-4.87781 -2.6875,-6.665c-1.78719,-1.78719 -4.31344,-2.60687 -6.665,-2.6875c-0.59125,-0.02687 -1.12875,-0.05375 -1.72,0zM155.5525,13.76c1.08844,0.04031 1.47813,0.29563 1.935,0.7525c0.45688,0.45688 0.71219,0.84656 0.7525,1.935c0.04031,1.08844 -0.20156,2.6875 -0.86,4.6225c-0.99437,2.88906 -2.96969,6.49031 -5.16,10.32l-11.61,-11.61c3.82969,-2.19031 7.43094,-4.16562 10.32,-5.16c1.935,-0.65844 3.53406,-0.90031 4.6225,-0.86zM134.6975,23.65l13.6525,13.76c-2.48594,3.27875 -17.76437,23.24688 -41.3875,46.87c-23.55594,23.55594 -54.22031,49.3425 -59.2325,53.535l-13.545,-13.545c4.1925,-5.01219 29.97906,-35.67656 53.535,-59.2325c23.69031,-23.69031 43.77938,-38.96875 46.9775,-41.3875zM30.4225,128.57l13.0075,13.0075c-8.42531,5.54969 -15.56062,8.86875 -20.425,10.535c-2.80844,0.9675 -2.83531,0.81969 -4.1925,1.075c0.25531,-1.35719 0.1075,-1.38406 1.075,-4.1925c1.66625,-4.86437 4.98531,-11.99969 10.535,-20.425z"
                  />
                </g>
              </g>
            </svg>
          </router-link>
          <div class="link-box delete">
            <Accordion>
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 172 172"
                  style=" fill:#000000;"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style="mix-blend-mode: normal"
                  >
                    <path d="M0,172v-172h172v172z" fill="none" />
                    <g fill="#000000">
                      <path
                        d="M30.96,13.76c-9.45834,0 -17.2,7.74166 -17.2,17.2v110.08c0,9.45834 7.74166,17.2 17.2,17.2h110.08c9.45834,0 17.2,-7.74166 17.2,-17.2v-110.08c0,-9.45834 -7.74166,-17.2 -17.2,-17.2zM30.96,20.64h110.08c5.73958,0 10.32,4.58042 10.32,10.32v110.08c0,5.73958 -4.58042,10.32 -10.32,10.32h-110.08c-5.73958,0 -10.32,-4.58042 -10.32,-10.32v-110.08c0,-5.73958 4.58042,-10.32 10.32,-10.32zM57.47219,52.60781l-4.86437,4.86437l28.52781,28.52781l-28.52781,28.52781l4.86437,4.86437l28.52781,-28.52781l28.52781,28.52781l4.86437,-4.86437l-28.52781,-28.52781l28.52781,-28.52781l-4.86437,-4.86437l-28.52781,28.52781z"
                      />
                    </g>
                  </g>
                </svg>
              </template>
              <p>{{c.title}} wirklich löschen?</p>
              <div class="button-wrap">
                <button class="sec close">zurück</button>
                <button class="delete" @click="deleteCat(c._id)">Löschen</button>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { API, config } from "@/constants";
import Accordion from "@/components/Accordion";
import { mapMutations } from "vuex";
export default {
  name: "Tasks",
  components: { Accordion },
  props: ["userId"],
  data() {
    return {
      msg: "",
      tasks: [],
      categories: [],
      newTask: {
        title: "",
        description: "",
        category_id: "",
        user_id: "",
        dates: {
          startOn: "",
          endOn: "",
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
          sun: false
        },
        priority: 1
      },
      newCategory: {
        title: ""
      }
    };
  },
  methods: {
    ...mapMutations(["setNotification"]),

    //getDate
    getDate(){
      let today = new Date().toISOString().substring(0,10)
      this.newTask.dates.startOn = today;
    },

    //Tasks
    async getTasks() {
      const body = {
        userId: this.userId
      };
      let response = await this.$http.post(API.task.get, body, config);
      this.tasks = response.data.items;
    },
    async createTask() {
      let valid = false;
      if (this.newTask.title) {
        valid = true;
      }
      if (valid) {
        const body = this.newTask;
        body.user_id = this.userId;
        try {
          await this.$http.post(API.task.create, body, config);
          this.getTasks();
          this.newTask = {};
          let allAcc = document.querySelectorAll(".accordion");
          console.log("setNote");
          this.setNotification({
            status: "success",
            msg: "Aufgabe erstellt"
          });
          allAcc.forEach(function(item) {
            item.classList.remove("active");
            item.querySelector(".content").style.maxHeight = `0px`;
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteTask(id) {
      const body = {
        _id: id
      };
      try {
        await this.$http.post(API.task.delete, body, config);
        this.getTasks();
        this.setNotification({ status: "success", msg: "Aufgabe gelöscht" });
      } catch (error) {
        console.log(error);
      }
    },

    //Categories
    async getCategories() {
      const body = {
        userId: this.userId
      };
      let response = await this.$http.post(API.category.get, body, config);
      this.categories = response.data.items;
    },
    async createCat() {
      let valid = false;
      if (this.newCategory.title) {
        valid = true;
      }
      if (valid) {
        const body = this.newCategory;
        body.user_id = this.userId;
        try {
          await this.$http.post(API.category.create, body, config);
          this.getCategories();
          this.newCategory = {};
          let allAcc = document.querySelectorAll(".accordion");
          console.log("setNote");
          this.setNotification({
            status: "success",
            msg: "Kategorie erstellt"
          });
          allAcc.forEach(function(item) {
            item.classList.remove("active");
            item.querySelector(".content").style.maxHeight = `0px`;
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteCat(id) {
      const body = {
        _id: id
      };
      try {
        await this.$http.post(API.category.delete, body, config);
        this.getCategories();
        this.setNotification({ status: "success", msg: "Kategorie gelöscht" });
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    sortedTasks: function() {
      let result = this.tasks;
      let compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      return result.sort(compare);
    },
    sortedCategories: function() {
      let result = this.categories;
      let compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      return result.sort(compare);
    }
  },
  mounted() {
    this.getDate();
    this.getTasks();
    this.getCategories();
  }
};
</script>