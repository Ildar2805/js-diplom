/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('token');
    if (!token) {
      token = prompt('Введите токен YaDisk');
      localStorage.setItem('token', token);
    }
    return token;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, src, callback){
    const token = Yandex.getToken();
    createRequest({
      method: 'POST',
      url: Yandex.HOST + '/resources/upload',
      data: {
        'path': path,
        'url': src,
      },
      headers: {
        'Authorization': `OAuth ${token}`,
      },
      cb: callback,
    });
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const token = Yandex.getToken();
    createRequest({
      method: 'DELETE',
      url: Yandex.HOST + '/resources',
      data: {
        'path': path,
      },
      headers:{
        'Authorization': `OAuth ${token}`,
      },
      cb: callback,
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const token = Yandex.getToken();
    createRequest({
      method: 'GET',
      url: Yandex.HOST + '/resources/files',
      headers:{
        'Authorization': `OAuth ${token}`,
      },
      cb: callback,
    });
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const a = document.createElement('a');
    a.href = url;
    a.click();
  }
}
