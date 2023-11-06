import {Component} from '@angular/core';
import {HttpData} from "./http.data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true
  loadedBox: any = ' '
  city: any = 'qom'
  cityId: any = 1
  blog: any
  cities: any

  constructor(private data: HttpData) {
  }


  ngOnInit(): void {
    this.blog = this.data.getBlog(this.cityId)
    console.log(this.blog)

    this.cities = this.data.getCities()
    this.cities
      .map((item: any) => {
          let el = document.getElementById(item.fingilish)
          // @ts-ignore
          el.setAttribute("cityId", item.id);
          // @ts-ignore
          el.classList.remove('deActive')
        }
      )
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }

  isNum(value: any) {
    return Number(value)
  }

  filterByCity(e: any, city: any) {
    this.loadedBox = "loaded"
    setTimeout(() => {
      this.loading = true
    }, 300) // تا انیمیشن خروج dom اجرا شود :)
    this.city = city
    let iranMap = document.querySelectorAll('.iranMap')
    for (let i = 0; i < iranMap.length; ++i) {
      iranMap[i].classList.remove('active');
    }
    e.target.parentElement.classList.toggle('active')
    // @ts-ignore
    this.cityId = document.getElementById(city).getAttribute('cityId')

    setTimeout(() => {
      this.blog = this.data.getBlog(this.cityId)
      this.loading = false
    }, 600) // درخواست به وب سرویس
    setTimeout(()=>{
      this.loadedBox = " "
    },700)
  }
}
