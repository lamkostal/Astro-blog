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
             const dateobject= new Date(this.plants[index].date)
             const utc1 = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
             const utc2 = Date.UTC(dateobject.getFullYear(), dateobject.getMonth(), dateobject.getDate());
             this.plants[index].days = Math.floor((utc1 - utc2) / _MS_PER_DAY);
             this.checkIsDry(index)
        },
        
        addItems(){
                 if( this.title !=='' && this.date !== '' ){
                 this.hideModal=false
                 this.plants.push({title:this.title, date:this.formatDate, days:this.days, freq:this.freq, isDry:this.isDry})
                 this.title =''
                 this.date = null
                 }  
                 else {alert('please fill both fields')}   
                 }, 
        removeItem(index){
                 this.plants.splice(index,1)
        },
        wateredToday(index){
                this.plants[index].date = this.today.toDateString()
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
             this.plants = JSON.parse(localStorage.getItem('plants'))
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