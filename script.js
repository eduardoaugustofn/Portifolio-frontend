(function () {
  const output = document.getElementById('output');
  const form = document.getElementById('cli');
  const input = document.getElementById('input');
  const terminal = document.getElementById('terminal');

  const DATA = {
    pt: {
      nome: 'Eduardo Augusto Freitas Nogueira',
      formacao: 'estudante de Ciência da Computação na PUC Minas, em Belo Horizonte, no primeiro período.',
      interesses: 'desenvolvimento web, front-end, jogos e interfaces acessíveis.',
      objetivo: 'tornar-se Full Stack Developer até 2030 e conseguir um estágio na área até 2028.',
      experiencia: [],
      projetos: [{
        nome: 'Heróis da Saúde',
        ano: '2026',
        descricao: 'jogo educativo sobre saúde, desenvolvido como projeto interdisciplinar entre Computação e Medicina na PUC Minas.',
        tecnologias: '[preencher depois]',
        repo: '',
        imagem: ''
      }],
      certificados: [{ nome: 'Inglês C1', instituicao: 'Wimbledon School of English', ano: '2024' }],
      contato: {
        email: 'eduafn2008@gmail.com',
        github: 'https://github.com/eduardoaugustofn',
        linkedin: 'https://br.linkedin.com/in/eduardo-augusto-freitas-nogueira-948112350'
      }
    },
    en: {
      nome: 'Eduardo Augusto Freitas Nogueira',
      formacao: 'Computer Science student at PUC Minas, Belo Horizonte, in the first semester.',
      interesses: 'web development, front-end, games and accessible interfaces.',
      objetivo: 'become a Full Stack Developer by 2030 and secure a development internship by 2028.',
      experiencia: [],
      projetos: [{
        nome: 'Heróis da Saúde',
        ano: '2026',
        descricao: 'educational health game developed as an interdisciplinary project between Computing and Medicine at PUC Minas.',
        tecnologias: '[preencher depois]',
        repo: '',
        imagem: ''
      }],
      certificados: [{ nome: 'English C1', instituicao: 'Wimbledon School of English', ano: '2024' }],
      contato: {
        email: 'eduafn2008@gmail.com',
        github: 'https://github.com/eduardoaugustofn',
        linkedin: 'https://br.linkedin.com/in/eduardo-augusto-freitas-nogueira-948112350'
      }
    }
  };

  // normalized color name keys (no hyphens or accents)
  const COLOR_NAMES = {
    verde: '#7af0c6',
    ambar: '#ffb86c',
    amarelo: '#ffd166',
    azul: '#6cb8ff',
    roxo: '#c49cff',
    vermelho: '#ff6a6a',
    branco: '#e6e6e6',
    cinza: '#dfe7e6',
    preto: '#111111',
    rosa: '#ff8ac6',
    ciano: '#67e8f9',
    laranja: '#ff9f43',
    verdeescuro: '#32b67a',
    marrom: '#9b6b43'
  };

  function appendLine(text, cls) {
    const d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.textContent = text;
    output.appendChild(d);
    scrollEnd();
    return d;
  }

  function appendBlock(node) {
    const wrapper = document.createElement('div');
    wrapper.className = 'block';
    wrapper.appendChild(node);
    output.appendChild(wrapper);
    scrollEnd();
    return wrapper;
  }

  function createElement(tag, text, cls) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function link(url, text) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text || url;
    return a;
  }

  function scrollEnd() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  const DEFAULT_COLOR = '#7af0c6';
  const STORAGE_KEY = 'portfolio_accent_color';

  function trySaveColor(color) {
    try { localStorage.setItem(STORAGE_KEY, color); } catch (e) {}
  }

  function tryLoadColor() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function normalizeColorName(value) {
    return String(value || '').trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9#]/g, '');
  }

  function resolveColor(rawValue) {
    const value = String(rawValue || '').trim();
    if (!value) return null;

    const normalized = normalizeColorName(value);
    if (COLOR_NAMES[normalized]) return COLOR_NAMES[normalized];

    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return value;
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('color', value)) return value;
    return null;
  }

  function applyAccent(color) {
    const resolved = resolveColor(color);
    if (!resolved) return false;

    document.documentElement.style.setProperty('--accent', resolved);
    document.documentElement.style.setProperty('--accent-2', resolved);
    const cursor = document.querySelector('.cursor');
    if (cursor) cursor.style.background = resolved;
    return true;
  }

  function renderAparencia() {
    const panel = document.createElement('div');
    panel.className = 'appear-panel';

    const title = createElement('div', 'Aparência — digite o nome da cor desejada', 'muted');
    panel.appendChild(title);

    const list = document.createElement('div');
    list.className = 'color-list';

    Object.keys(COLOR_NAMES).forEach((name) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'color-chip';
      chip.textContent = name;
      chip.title = name;
      chip.addEventListener('click', () => {
        const inputColor = panel.querySelector('input[type="text"]');
        if (inputColor) {
          inputColor.value = name;
          inputColor.focus();
        }
      });
      list.appendChild(chip);
    });

    panel.appendChild(list);

    const row = document.createElement('div');
    row.className = 'color-field';

    const field = document.createElement('input');
    field.type = 'text';
    field.value = 'verde';
    field.placeholder = 'Ex.: verde, azul, roxo, vermelho';
    field.setAttribute('aria-label', 'Nome da cor');

    const applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.textContent = 'aplicar';
    applyBtn.addEventListener('click', () => {
      const raw = field.value;
      const ok = applyAccent(raw);
      if (ok) {
        trySaveColor(normalizeColorName(raw));
        appendLine('Cor aplicada: ' + raw, 'muted');
      } else {
        appendLine('Cor inválida: ' + raw + '. Tente verde, azul, roxo, vermelho, amarelo, branco, etc.', 'error');
      }
    });

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'restaurar padrão';
    resetBtn.addEventListener('click', () => {
      applyAccent(DEFAULT_COLOR);
      trySaveColor(DEFAULT_COLOR);
      field.value = 'verde';
      appendLine('Cor restaurada para o padrão.', 'muted');
    });

    row.append(field, applyBtn, resetBtn);
    panel.appendChild(row);

    const hint = createElement('div', 'Sugestões: verde, ambar, azul, roxo, vermelho, branco, amarelo, rosa, ciano, laranja, cinza, preto.', 'muted');
    panel.appendChild(hint);

    appendBlock(panel);
  }

  function renderSobre() {
    const box = document.createElement('div');
    box.className = 'block';

    box.appendChild(createElement('div', '[PT]', 'line highlight'));
    box.appendChild(createElement('div', 'Nome: ' + DATA.pt.nome, 'line'));
    box.appendChild(createElement('div', 'Formação: ' + DATA.pt.formacao, 'line'));
    box.appendChild(createElement('div', 'Interesses: ' + DATA.pt.interesses, 'line'));
    box.appendChild(createElement('div', 'Objetivo: ' + DATA.pt.objetivo, 'line'));

    box.appendChild(createElement('div', '[EN]', 'line highlight'));
    box.appendChild(createElement('div', 'Name: ' + DATA.en.nome, 'line'));
    box.appendChild(createElement('div', 'Education: ' + DATA.en.formacao, 'line'));
    box.appendChild(createElement('div', 'Interests: ' + DATA.en.interesses, 'line'));
    box.appendChild(createElement('div', 'Goal: ' + DATA.en.objetivo, 'line'));

    output.appendChild(box);
    scrollEnd();
  }

  function renderProjetos() {
    const box = document.createElement('div');
    box.className = 'block';
    box.appendChild(createElement('div', 'Projetos', 'line highlight'));

    const ul = document.createElement('ul');
    ul.className = 'project-list';

    DATA.pt.projetos.forEach((p) => {
      const li = document.createElement('li');
      li.className = 'project-item';

      li.appendChild(createElement('div', p.nome + ' (' + p.ano + ')', 'line highlight'));
      li.appendChild(createElement('div', p.descricao, 'line'));
      li.appendChild(createElement('div', 'Tecnologias: ' + p.tecnologias, 'line muted'));

      if (p.repo && p.repo.trim() !== '') {
        const repoLine = document.createElement('div');
        repoLine.className = 'line';
        repoLine.appendChild(document.createTextNode('Repositório: '));
        repoLine.appendChild(link(p.repo, 'GitHub'));
        li.appendChild(repoLine);
      }

      if (p.imagem && p.imagem.trim() !== '') {
        const img = document.createElement('img');
        img.src = p.imagem;
        img.alt = 'Imagem do projeto ' + p.nome;
        li.appendChild(img);
      }

      ul.appendChild(li);
    });

    box.appendChild(ul);
    output.appendChild(box);
    scrollEnd();
  }

  function renderExperiencias() {
    const box = document.createElement('div');
    box.className = 'block';
    box.appendChild(createElement('div', 'Experiências', 'line highlight'));

    if (!DATA.pt.experiencia || DATA.pt.experiencia.length === 0) {
      box.appendChild(createElement('div', 'Em breve', 'line muted'));
    } else {
      const ul = document.createElement('ul');
      ul.className = 'experience-list';
      DATA.pt.experiencia.forEach((it) => {
        const li = document.createElement('li');
        li.className = 'experience-item';
        li.appendChild(createElement('div', it.empresa + ' — ' + it.cargo, 'line highlight'));
        li.appendChild(createElement('div', it.periodo, 'line period'));
        li.appendChild(createElement('div', it.descricao, 'line'));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }

    output.appendChild(box);
    scrollEnd();
  }

  function renderCertificados() {
    const box = document.createElement('div');
    box.className = 'block';
    box.appendChild(createElement('div', 'Certificados', 'line highlight'));

    const ul = document.createElement('ul');
    ul.className = 'cert-list';
    DATA.pt.certificados.forEach((c) => {
      const li = document.createElement('li');
      li.className = 'line';
      li.textContent = c.nome + ', ' + c.instituicao + ', ' + c.ano + '.';
      ul.appendChild(li);
    });

    box.appendChild(ul);
    output.appendChild(box);
    scrollEnd();
  }

  function renderContato() {
    const box = document.createElement('div');
    box.className = 'block';
    box.appendChild(createElement('div', 'Contato', 'line highlight'));

    const ul = document.createElement('ul');
    ul.className = 'contact-list';

    const email = document.createElement('li');
    email.className = 'line';
    email.appendChild(document.createTextNode('E-mail: '));
    email.appendChild(link('mailto:' + DATA.pt.contato.email, DATA.pt.contato.email));
    ul.appendChild(email);

    const gh = document.createElement('li');
    gh.className = 'line';
    gh.appendChild(document.createTextNode('GitHub: '));
    gh.appendChild(link(DATA.pt.contato.github, DATA.pt.contato.github.replace(/^https?:\/\//, '')));
    ul.appendChild(gh);

    const li = document.createElement('li');
    li.className = 'line';
    li.appendChild(document.createTextNode('LinkedIn: '));
    li.appendChild(link(DATA.pt.contato.linkedin, DATA.pt.contato.linkedin.replace(/^https?:\/\//, '')));
    ul.appendChild(li);

    box.appendChild(ul);
    output.appendChild(box);
    scrollEnd();
  }

  const COMMANDS = {
    ajuda: function () {
      appendLine('Comandos disponíveis:', 'highlight');
      appendLine('  sobre          apresentação (PT/EN)');
      appendLine('  projetos       lista de projetos');
      appendLine('  experiencias   experiências profissionais');
      appendLine('  certificados   certificados');
      appendLine('  contato        formas de contato');
      appendLine('  aparencia      painel de aparências (cores)');
      appendLine('  limpar         limpa a tela');
    },
    sobre: function () { renderSobre(); },
    projetos: function () { renderProjetos(); },
    experiencias: function () { renderExperiencias(); },
    certificados: function () { renderCertificados(); },
    contato: function () { renderContato(); },
    aparencia: function () { renderAparencia(); },
    limpar: function () { output.innerHTML = ''; }
  };

  function execCommand(text) {
    const cmd = (text || '').trim().toLowerCase();
    appendLine('eduardo@portfolio:~$ ' + (text || ''), 'muted');

    if (!cmd) return;
    if (!COMMANDS[cmd]) {
      appendLine('Comando não encontrado: ' + cmd + '. Digite "ajuda".', 'error');
      return;
    }

    COMMANDS[cmd]();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    execCommand(input.value);
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const suggestions = Object.keys(COMMANDS);
      const value = input.value.trim().toLowerCase();
      const found = suggestions.find((cmd) => cmd.startsWith(value));
      if (found) input.value = found;
    }
  });

  terminal.addEventListener('click', () => input.focus());

  const saved = tryLoadColor();
  if (saved) {
    applyAccent(saved);
  } else {
    applyAccent(DEFAULT_COLOR);
  }

  appendLine('Digite "ajuda" para ver os comandos.', 'dim');
})();
