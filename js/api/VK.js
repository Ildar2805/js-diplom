/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'vk1.a.jSqyRP6p5lye4_wEZbAiutkq3waoze0IQkUdjBwxUfE68A9XkEtUTG7mbS82GjjCKYQrmI4W-KRlOnn1btefXVBI7EfsneoY2yiHq6Sa97h1RCP0YLKmRMwkoO-InyYbKceXWJ7Xnkis2lWFfQuDsXGaF94frZM7vpz2qAV02vHrdh5yYb40VeMbFCtOAHAmk_L5wwi-9kB7IbpX0tXRmw';
  static lastCallback;
  static BaseUrl = 'https://api.vk.com/method/'
  
  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    const script = document.createElement('script');
    script.id = 'addedScript';
    script.src = this.BaseUrl + 'photos.get?owner_id=' + id + '&album_id=profile&access_token=' + this.ACCESS_TOKEN + '&v=5.131&callback=VK.processData';
    document.getElementsByTagName('body')[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.getElementById('addedScript').remove();
    result.onerror = () => {
      alert('Не удалось загрузить скрипт!');
      return;
    };
    let images = [];
    const types = ['w', 'z', 'y', 'x', 'r', 'q', 'p', 'm', 'o', 's'];
    
    for (let img of result.response.items) {
      for (let size of img['sizes']) {
        images.push(size);
      }
    }

    let choosedImages = [];
    
    for (let type of types) {
      if (choosedImages.length === 3) {
        break;
      }
      for (let img of images) {
        if (img.type === type) {
          choosedImages.push(img.url);
        }
        if (choosedImages.length === 3) {
          break;
        }
      }
    }
    this.lastCallback(choosedImages);
    this.lastCallback = () => {};
  }
}
