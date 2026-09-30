(function () {

  // =========================================
  // MENÚ RESPONSIVO
  // =========================================

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('navLinks');

  if (toggle && nav) {

    toggle.addEventListener('click', function () {

      var open = nav.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        open ? 'true' : 'false'
      );

    });

    nav.querySelectorAll('a').forEach(function (link) {

      link.addEventListener('click', function () {

        nav.classList.remove('open');

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }


  // =========================================
  // NAVEGACIÓN ACTIVA AL DESPLAZARSE
  // =========================================

  var sections = document.querySelectorAll('section[id]');
  var navAnchors = nav ? nav.querySelectorAll('a') : [];

  if ('IntersectionObserver' in window && nav) {

    var activeObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            navAnchors.forEach(function (a) {

              a.classList.toggle(
                'active',
                a.getAttribute('href') === '#' + entry.target.id
              );

            });

          }

        });

      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (s) {
      activeObserver.observe(s);
    });

  }


  // =========================================
  // ANIMACIÓN DE ELEMENTOS AL BAJAR
  // =========================================

  if ('IntersectionObserver' in window) {

    var revealObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add('in');

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

  }


  // =========================================
  // HERO - FONDO AUTOMÁTICO
  // =========================================

  var heroBgSlides = document.querySelectorAll('.hero-bg-slide');
  var heroIndex = 0;

  if (heroBgSlides.length > 1) {

    window.setInterval(function () {

      heroBgSlides[heroIndex].classList.remove('is-active');

      heroIndex = (heroIndex + 1) % heroBgSlides.length;

      heroBgSlides[heroIndex].classList.add('is-active');

    }, 3000);

  }


  // =========================================
  // FIGURAS IMPORTANTES
  // =========================================

  var figuras = [
    {
      imagen: 'EMBAJADORA DE LOS ESTADOS UNIDOS Y EL MINISTRO LUIS MIGUE DE CAMPS.jpg',
      nombre: 'Embajadora de los Estados Unidos en República Dominicana',
      descripcion:
        'El viernes 18 de septiembre de 2026, en el marco de la ' +
        'visita oficial de la embajadora de los Estados Unidos ' +
        'al Ministerio de Educación, el Departamento de Informática ' +
        'Educativa realizó una exhibición de los recursos de ' +
        'robótica presentes en las escuelas públicas. En esta ' +
        'actividad tuvimos el honor de compartir con la embajadora ' +
        'y mostrarle nuestros proyectos.'
    },

    {
      imagen: 'abraham1.jpg',
      nombre: 'Abraham Dauhajre',
      descripcion:
        'Tuvimos el honor y el placer de contar con el apoyo constante de Abraham Dauhajre, ' +
        'una figura fundamental para el desarrollo de la robótica educativa y el programa FIRST ' +
        'en República Dominicana. A lo largo de nuestra trayectoria, hemos contado con su orientación, ' +
        'respaldo y acompañamiento, contribuyendo al crecimiento de nuestro equipo y a nuestra participación ' +
        'en competencias de robótica. Su compromiso con los jóvenes y con el desarrollo de la ciencia, la tecnología ' +
        'y la innovación ha sido un apoyo invaluable para nosotros.'
    },

    {
      imagen: 'Ancell.jpg',
      nombre: 'Ancell Scheker',
      descripcion:
        'Tuvimos el honor y el placer de contar con la visita ' +
        'a nuestras instalaciones de la Viceministra de Asuntos Técnicos y Pedagógicos ' +
        'del Ministerio de Educación de República Dominicana Ancell Scheker, ' +
        'la cual estuvo viendo nuestros proyectos y conociendo más del equipo.'
    },

    {
      imagen: 'Aileed decamps.jpg',
      nombre: 'Aileen Decamps',
      descripcion:
        'Como equipo tuvimos el honor de tener la visita de la Regidora de Santo Domingo Este ' +
        'Aileen Decamps, la cual es nuestra madrina y siempre podemos contar con su apoyo.'
    },

    {
      imagen: 'regidora2.jpg',
      nombre: 'Jehimy Esthefany Núñez Pérez',
      descripcion:
        'Tuvimos el honor de contar con su visita en nuestras instalaciones, ' +
        'y de poder encontrárnosla el día de la competencia en Miami y contar con su apoyo.'
    }

  ];

  var figuraIndex = 0;

  var figuraImagenEl = document.getElementById('figuraImagen');
  var figuraNombreEl = document.getElementById('figuraNombre');
  var figuraDescripcionEl = document.getElementById('figuraDescripcion');
  var figuraNumeroEl = document.getElementById('figuraNumero');
  var figuraPuntosEl = document.getElementById('figuraPuntos');
  var figuraPrevBtn = document.getElementById('figuraPrev');
  var figuraNextBtn = document.getElementById('figuraNext');


  function pad2(n) {
    return n < 10 ? '0' + n : '' + n;
  }


  function renderFiguraPuntos() {

    if (!figuraPuntosEl) {
      return;
    }

    figuraPuntosEl.innerHTML = '';

    figuras.forEach(function (_, i) {

      var dot = document.createElement('button');

      dot.type = 'button';

      dot.className =
        'figura-punto' +
        (i === figuraIndex ? ' active' : '');

      dot.setAttribute(
        'aria-label',
        'Ir a la figura ' + (i + 1)
      );

      dot.addEventListener('click', function () {

        figuraIndex = i;

        renderFigura();

      });

      figuraPuntosEl.appendChild(dot);

    });

  }


  function renderFigura() {

    if (!figuras.length) {
      return;
    }

    if (
      !figuraImagenEl ||
      !figuraNombreEl ||
      !figuraDescripcionEl ||
      !figuraNumeroEl
    ) {
      return;
    }

    var f = figuras[figuraIndex];

    figuraImagenEl.src = f.imagen;
    figuraImagenEl.alt = f.nombre;

    figuraNombreEl.textContent = f.nombre;
    figuraDescripcionEl.textContent = f.descripcion;

    figuraNumeroEl.textContent =
      pad2(figuraIndex + 1) +
      ' / ' +
      pad2(figuras.length);

    renderFiguraPuntos();

  }


  if (
    figuraPrevBtn &&
    figuraNextBtn &&
    figuras.length
  ) {

    figuraPrevBtn.addEventListener('click', function () {

      figuraIndex =
        (figuraIndex - 1 + figuras.length) %
        figuras.length;

      renderFigura();

    });


    figuraNextBtn.addEventListener('click', function () {

      figuraIndex =
        (figuraIndex + 1) %
        figuras.length;

      renderFigura();

    });


    renderFigura();

  }


  // =========================================
  // PREMIOS OBTENIDOS
  // =========================================

  var premios = [
    {
      imagen: 'LOGROS.jpg',
      titulo: 'Nuestros reconocimientos',
      descripcion:
        'Nuestros reconocimientos son una muestra del esfuerzo, la dedicación y el ' +
        'compromiso de todo el equipo. Cada logro refleja nuestras capacidades, el trabajo en ' +
        'conjunto y nuestras ganas de seguir creciendo, superando desafíos y alcanzando nuevas metas.'
    },

    {
      imagen: 'Stem For Everyone 2025.jpg',
      titulo: 'Stem For Everyone',
      descripcion:
        'En nuestro primer año 2025 tuvimos el honor de poder obtener el Stem For Everyone, un reconocimiento ' +
        'que representa nuestro compromiso con la educación STEM y con la creación de ' +
        'oportunidades para que más jóvenes puedan descubrir, aprender y crecer a través de la ciencia, ' +
        'la tecnología, la ingeniería y las matemáticas.'
    },

    {
      imagen: 'Spirit Award 2026.jpg',
      titulo: 'Team Spirit Award',
      descripcion:
        'En nuestro segundo año 2026, tuvimos el honor de poder obtener el Spirit Award, ' +
        'un reconocimiento que premia el entusiasmo, la unión, la energía y el espíritu de ' +
        'colaboración demostrado por un equipo durante la competencia. ' +
        'Este premio destacó nuestra pasión por la robótica, el compañerismo y la manera ' +
        'en que representamos los valores de FIRST, tanto dentro como fuera de la cancha.'
    },

    {
      imagen: 'Stem For Everyone 2026.jpg',
      titulo: 'Steam For Everyone',
      descripcion:
        'En nuestro segundo año 2026 pudimos obtener nuevamente el Stem For Everyone, un reconocimiento que ' +
        'reafirma nuestro compromiso con la educación STEM, la inclusión y ' +
        'el desarrollo de nuevas oportunidades para los jóvenes. Este logro refleja nuestro esfuerzo ' +
        'por inspirar, compartir conocimientos y demostrar que el talento y la innovación pueden ' +
        'transformar nuestro futuro.'
    }

  ];

  var premioIndex = 0;

  var premioImagenEl = document.getElementById('premioImagen');
  var premioTituloEl = document.getElementById('premioTitulo');
  var premioDescripcionEl = document.getElementById('premioDescripcion');
  var premioNumeroEl = document.getElementById('premioNumero');
  var premioPuntosEl = document.getElementById('premioPuntos');
  var premioPrevBtn = document.getElementById('premioPrev');
  var premioNextBtn = document.getElementById('premioNext');


  function renderPremioPuntos() {

    if (!premioPuntosEl) {
      return;
    }

    premioPuntosEl.innerHTML = '';

    premios.forEach(function (_, i) {

      var dot = document.createElement('button');

      dot.type = 'button';

      dot.className =
        'premio-punto' +
        (i === premioIndex ? ' active' : '');

      dot.setAttribute(
        'aria-label',
        'Ir al premio ' + (i + 1)
      );

      dot.addEventListener('click', function () {

        premioIndex = i;

        renderPremio();

      });

      premioPuntosEl.appendChild(dot);

    });

  }


  function renderPremio() {

    if (!premios.length) {
      return;
    }

    if (
      !premioImagenEl ||
      !premioTituloEl ||
      !premioDescripcionEl ||
      !premioNumeroEl
    ) {
      return;
    }

    var p = premios[premioIndex];

    premioImagenEl.src = p.imagen;
    premioImagenEl.alt = p.titulo;

    premioTituloEl.textContent = p.titulo;
    premioDescripcionEl.textContent = p.descripcion;

    premioNumeroEl.textContent =
      pad2(premioIndex + 1) +
      ' / ' +
      pad2(premios.length);

    renderPremioPuntos();

  }


  if (
    premioPrevBtn &&
    premioNextBtn &&
    premios.length
  ) {

    premioPrevBtn.addEventListener('click', function () {

      premioIndex =
        (premioIndex - 1 + premios.length) %
        premios.length;

      renderPremio();

    });


    premioNextBtn.addEventListener('click', function () {

      premioIndex =
        (premioIndex + 1) %
        premios.length;

      renderPremio();

    });


    renderPremio();

  }


  // =========================================
  // SELECCIÓN DE TIPO DE PATROCINIO
  // =========================================

  document.querySelectorAll('.radio-pill input').forEach(function (input) {

    input.addEventListener('change', function () {

      document
        .querySelectorAll('#tipoGroup .radio-pill')
        .forEach(function (p) {

          p.classList.remove('checked');

        });

      var pill = input.closest('.radio-pill');

      if (pill) {
        pill.classList.add('checked');
      }

      var tipo = document.getElementById('f-tipo');

      if (tipo) {
        tipo.classList.remove('invalid');
      }

    });

  });


  // =========================================
  // VALIDACIÓN DE CORREO
  // =========================================

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }


  // =========================================
  // MARCAR CAMPOS INVÁLIDOS
  // =========================================

  function setInvalid(fieldEl, invalid) {

    if (fieldEl) {
      fieldEl.classList.toggle('invalid', invalid);
    }

  }


  // =========================================
  // FORMULARIO DE PATROCINIO
  // =========================================

  var sponsorForm = document.getElementById('sponsorForm');

  if (sponsorForm) {

    sponsorForm.addEventListener('submit', function (e) {

      e.preventDefault();

      var nombre = document.getElementById('s-nombre');
      var correo = document.getElementById('s-correo');

      var tipoChecked = sponsorForm.querySelector(
        'input[name="tipo"]:checked'
      );

      var status = document.getElementById('formStatus');

      var ok = true;


      // VALIDAR NOMBRE

      setInvalid(
        document.getElementById('f-nombre'),
        !nombre || nombre.value.trim() === ''
      );

      if (!nombre || nombre.value.trim() === '') {
        ok = false;
      }


      // VALIDAR CORREO

      setInvalid(
        document.getElementById('f-correo'),
        !correo || !isEmail(correo.value.trim())
      );

      if (!correo || !isEmail(correo.value.trim())) {
        ok = false;
      }


      // VALIDAR TIPO

      setInvalid(
        document.getElementById('f-tipo'),
        !tipoChecked
      );

      if (!tipoChecked) {
        ok = false;
      }


      // SI HAY ERRORES

      if (!ok) {

        if (status) {
          status.className = 'bad';
          status.textContent =
            'Revisa los campos marcados en rojo antes de enviar.';
        }

        return;
      }


      // PREPARAR DATOS

      var formData = new FormData(sponsorForm);
      formData.append('_subject', 'Nueva solicitud de patrocinio - Team Merengue');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');


      // ENVIAR A TEAM MERENGUE

      fetch(
        'https://formsubmit.co/ajax/teammerengue10635@gmail.com',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }
      )

      .then(function (response) {

        return response.json().then(function (data) {

          console.log('STATUS:', response.status);
          console.log('RESPUESTA FORMSUBMIT:', data);

          if (!response.ok || data.success === 'false' || data.success === false) {
            throw new Error(data.message || 'Error al enviar el formulario');
          }

          return data;

        });

      })

      .then(function () {

        if (status) {

          status.className = 'ok';

          status.textContent =
            '¡Gracias, ' +
            nombre.value.trim() +
            '! Recibimos tu solicitud de ' +
            tipoChecked.value.toLowerCase() +
            ' y te contactaremos pronto a ' +
            correo.value.trim() +
            '.';

        }

        sponsorForm.reset();

        document
          .querySelectorAll('#tipoGroup .radio-pill')
          .forEach(function (p) {
            p.classList.remove('checked');
          });

      })

      .catch(function (error) {

        console.error('ERROR FORMSUBMIT:', error);

        if (status) {

          status.className = 'bad';

          status.textContent =
            'No pudimos enviar la solicitud. Inténtalo nuevamente.';

        }

      });

    });

  }


  // =========================================
  // FORMULARIO DE CONTACTO
  // =========================================

  var contactForm = document.getElementById('contactForm');

  if (contactForm) {

    contactForm.addEventListener('submit', function (e) {

      e.preventDefault();

      var nombre = document.getElementById('c-name');
      var correo = document.getElementById('c-mail');
      var mensaje = document.getElementById('c-msg');

      var status = document.getElementById('contactStatus');

      var ok = true;


      // VALIDAR NOMBRE

      setInvalid(
        document.getElementById('c-nombre'),
        !nombre || nombre.value.trim() === ''
      );

      if (!nombre || nombre.value.trim() === '') {
        ok = false;
      }


      // VALIDAR CORREO

      setInvalid(
        document.getElementById('c-correo'),
        !correo || !isEmail(correo.value.trim())
      );

      if (!correo || !isEmail(correo.value.trim())) {
        ok = false;
      }


      // VALIDAR MENSAJE

      setInvalid(
        document.getElementById('c-mensaje'),
        !mensaje || mensaje.value.trim() === ''
      );

      if (!mensaje || mensaje.value.trim() === '') {
        ok = false;
      }


      // SI HAY ERRORES

      if (!ok) {

        if (status) {

          status.className = 'bad';

          status.textContent =
            'Completa los campos marcados en rojo.';

        }

        return;
      }


      // PREPARAR DATOS

      var formData = new FormData(contactForm);
      formData.append('_subject', 'Nuevo mensaje de contacto - Team Merengue');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');


      // ENVIAR A TEAM MERENGUE

      fetch(
        'https://formsubmit.co/ajax/teammerengue10635@gmail.com',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }
      )

      .then(function (response) {

        return response.json().then(function (data) {

          console.log('STATUS:', response.status);
          console.log('RESPUESTA FORMSUBMIT:', data);

          if (!response.ok || data.success === 'false' || data.success === false) {
            throw new Error(data.message || 'Error al enviar el formulario');
          }

          return data;

        });

      })

      .then(function () {

        if (status) {

          status.className = 'ok';

          status.textContent =
            '¡Mensaje enviado! Te responderemos pronto a ' +
            correo.value.trim() +
            '.';

        }

        contactForm.reset();

      })

      .catch(function (error) {

        console.error('ERROR FORMSUBMIT:', error);

        if (status) {

          status.className = 'bad';

          status.textContent =
            'No pudimos enviar el mensaje. Inténtalo nuevamente.';

        }

      });

    });

  }


})();
