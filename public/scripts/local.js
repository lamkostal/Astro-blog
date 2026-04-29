document.addEventListener('alpine:init', () => {
    Alpine.data('water', () => ({
        temperature:'',
        weatherConditionIcon:'',
        weatherConditionText:'',
        location:'',
        alert:'',
        hideModal:true,
        neverShowModal:false,
        isDry:true,
        title:'',
        date:'',
        openDatesIndex: null,
        days:undefined,
        freq:'',
        plants:[],
        today:new Date,
        get dryPlants(){
            return this.plants.filter((plant)=>plant.isDry==true)
        },
        get formatDate(){
            return new Date(this.date.split('/').reverse().join('/')).toDateString()
        },
        itemdateDiff(index){
             const _MS_PER_DAY = 1000 * 60 * 60 * 24;
             // prefer history[0] (most recent) if available
             let dateVal = null
             if(this.plants[index].history && this.plants[index].history.length){
                 dateVal = new Date(this.plants[index].history[0])
             } else if (this.plants[index].date){
                 dateVal = new Date(this.plants[index].date)
             } else {
                 dateVal = new Date()
             }
             const dateobject = dateVal
             const utc1 = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
             const utc2 = Date.UTC(dateobject.getFullYear(), dateobject.getMonth(), dateobject.getDate());
             this.plants[index].days = Math.floor((utc1 - utc2) / _MS_PER_DAY);
            // keep a human-friendly display field for compatibility
           this.plants[index].date = this.plants[index].history && this.plants[index].history.length ? new Date(this.plants[index].history[0]).toDateString() : this.plants[index].date
             this.checkIsDry(index)
        },
        
        addItems(){
             if( this.title !=='' && this.date !== '' ){
             this.hideModal=false
             // convert datepicker value (dd/mm/yyyy) to ISO string
            const iso = new Date(this.date.split('/').reverse().join('/')).toISOString()
           this.plants.push({title:this.title, history:[iso], date:new Date(iso).toDateString(), days:this.days, freq:this.freq, isDry:this.isDry})
             this.title =''
             this.date = null
             }  
             else {alert('please fill both fields')}   
             }, 
        removeItem(index){
                 this.plants.splice(index,1)
        },
        toggleOpenDates(index){
            this.openDatesIndex = this.openDatesIndex === index ? null : index
        },
        wateredToday(index){
            const todayStr = this.today.toDateString()
            if(!this.plants[index].history) this.plants[index].history = []
            // if the most recent history entry is already today, don't add a duplicate
            if(this.plants[index].history.length && new Date(this.plants[index].history[0]).toDateString() === todayStr){
                // update display and recalc
                this.plants[index].date = todayStr
                this.itemdateDiff(index)
                return
            }
            const iso = this.today.toISOString()
            // add most recent at front
            this.plants[index].history.unshift(iso)
            // keep last 10 entries
            if(this.plants[index].history.length>10) this.plants[index].history.length = 10
            this.plants[index].date = todayStr
            this.itemdateDiff(index)
        },
        checkIsDry(index){
            if(this.plants[index].freq && this.plants[index].days >= this.plants[index].freq || this.plants[index].freq==='' ){
                this.plants[index].isDry = true
               
            } else { this.plants[index].isDry = false}
            
        },
      
          saveData(){
              localStorage.setItem('plants',JSON.stringify(this.plants))
          },
        saveModalState(){
        this.neverShowModal= true
              localStorage.setItem('modalIsOff',JSON.stringify(this.neverShowModal))  
    
        },
        loadData(){
        console.log(this.dryPlants)
            if(localStorage.getItem('plants')){
             const raw = JSON.parse(localStorage.getItem('plants'))
             // migrate legacy items that used `date` to `history`
             this.plants = raw.map((p)=>{
                 const item = {...p}
                 if(!item.history){
                     if(item.date){
                         const parsed = new Date(item.date)
                         if(!isNaN(parsed)){
                             item.history = [parsed.toISOString()]
                         } else {
                             item.history = []
                         }
                     } else {
                         item.history = []
                     }
                 }
                 // ensure history entries are ISO strings
                 item.history = item.history.map(h => (new Date(h)).toISOString())
                 // ensure a display-friendly date string is present
                 item.date = item.history && item.history.length ? new Date(item.history[0]).toDateString() : (item.date||'')
                 return item
             })
            }
              if(localStorage.getItem('modalIsOff')){
              this.neverShowModal = JSON.parse(localStorage.getItem('modalIsOff'))
              }
        },
        modalIsShown(){
          if(this.hideModal === false && this.neverShowModal === false){
          return true
          }
        },
        getWeather() {
        let response =  fetch('https://api.weatherapi.com/v1/forecast.json?key=24332d362db2453ab09102256252003&q=auto:ip&days=14&aqi=no&alerts=yes&lang=el').then((response) => response.json()).then( data => {
        this.temperature = data.current.temp_c
        this.weatherConditionIcon = data.current.condition.icon
        this.weatherConditionText = data.current.condition.text
        this.location = data.location.region
        if ( data.alerts.alert[0] ){
            this.alert = data.alerts.alert[0].event
        }
        })    
    },
    }))
})