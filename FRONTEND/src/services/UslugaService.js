import { HttpService } from './HttpService';

const naziv = '/Usluga';

async function get() {
  return await HttpService.get(naziv)
    .then((odgovor) => {
      return odgovor.data;
    })
    .catch((e) => {
      return e;
    });
}

async function post(usluga) {
  return await HttpService.post(naziv, usluga)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function put(sifra, usluga) {
  return await HttpService.put(naziv + '/' + sifra, usluga)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function _delete(sifraUsluga) {
  return await HttpService.delete(naziv + '/' + sifraUsluga)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data.poruka };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

async function getBySifra(sifra) {
  return await HttpService.get(naziv + '/' + sifra)
    .then((o) => {
      return { greska: false, poruka: o.data };
    })
    .catch((e) => {
      return { greska: true, poruka: e };
    });
}

export default {
  get,
  post,
  _delete,
  getBySifra,
  put,
};
