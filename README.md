![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

# EventDriven

Projeto para o aplicativo de criação e administração de eventos referente ao projeto integrador VI-A do curso de análise de sistemas do CESMAC.

### Plano de Projeto

#### 1. **Escopo**
O projeto **Event Driven** é uma plataforma de publicação e gestão de eventos em Alagoas, abrangendo uma variedade de categorias como cultura, cinema, comida, feiras, festas, moda, música, e viagens. O objetivo é conectar organizadores e visitantes, promovendo eventos que valorizam a cultura e economia local. A plataforma será acessível tanto para usuários cadastrados quanto para visitantes não cadastrados, que poderão visualizar eventos programados para o dia atual e futuras datas.

As funcionalidades selecionadas para entrega no prazo de 1 mês e 10 dias foram priorizadas com base em sua relevância imediata para o público e sua viabilidade técnica, visando garantir uma experiência robusta no lançamento da plataforma.

- **Funcionalidades entregues**:
    1. **Cadastro e gerenciamento de eventos**: Organizadores poderão cadastrar e gerenciar eventos com informações detalhadas (nome, descrição, data, horário, local e categorias específicas).
        - **Justificativa**: Essa funcionalidade é o núcleo da plataforma, permitindo que organizadores divulguem seus eventos e atraíam o público. A entrega dessa função é crucial para que a plataforma cumpra seu objetivo principal de ser um portal de eventos.
    2. **Edição de eventos cadastrados**: Organizadores poderão atualizar informações dos eventos previamente cadastrados.
        - **Justificativa**: Flexibilidade é fundamental para que os organizadores possam corrigir ou adicionar detalhes de última hora, garantindo a relevância e atualidade das informações dos eventos.
    3. **Visualização de eventos por visitantes não cadastrados**: Qualquer visitante, mesmo sem se cadastrar, poderá acessar a plataforma e visualizar eventos programados para o dia atual e datas futuras.
        - **Justificativa**: Essa funcionalidade é essencial para engajar um público amplo e aumentar a visibilidade dos eventos, facilitando a participação espontânea sem a necessidade de registro prévio.
    4. **Listagem de eventos por categoria**: Os eventos serão listados conforme suas categorias (cultura, cinema, comida, feira, festa, moda, música, e viagem), permitindo uma navegação mais fácil e personalizada.
        - **Justificativa**: A categorização dos eventos facilita a busca por parte dos visitantes, aumentando a usabilidade da plataforma e garantindo uma experiência mais fluida e intuitiva para o usuário final.
    5. **Mapa interativo de eventos**: Os visitantes poderão visualizar os eventos em um mapa interativo, filtrando por localização e data.
        - **Justificativa**: O mapa fornece uma maneira visual e prática de explorar eventos, tornando a busca por eventos próximos mais eficiente e aumentando a interação dos visitantes com a plataforma.
    6. **Agenda de eventos futuros**: Exibe uma agenda completa dos eventos que ocorrerão nas próximas semanas e meses, com filtros por data e local.
        - **Justificativa**: A agenda ajuda os usuários a planejar suas visitas a eventos com antecedência, aumentando a chance de participação e engajamento contínuo com a plataforma.
    7. **Sistema de avaliação e comentários de eventos**: Visitantes poderão avaliar e deixar comentários sobre os eventos dos quais participaram.
        - **Justificativa**: Esse sistema melhora a confiabilidade das informações para outros usuários e ajuda organizadores a receber feedback direto, promovendo uma melhoria contínua dos eventos.
    8. **Ferramentas para administradores do sistema**: Administradores têm a capacidade de gerenciar conteúdo, moderar comentários e monitorar a atividade na plataforma. O gerenciamento de conteúdo e monitoramento de atividades são feitos através do painel do Firebase, enquanto a moderação de comentários será implementada no próprio aplicativo.
       - **Justificativa**: Essa funcionalidade é importante para garantir a integridade da plataforma, permitindo que os administradores mantenham a qualidade do conteúdo, monitorem o uso da plataforma e moderem interações entre usuários para evitar abusos.

Essas funcionalidades foram priorizadas por serem as mais importantes para atrair organizadores e visitantes logo no lançamento, estabelecendo a base de uso contínuo da plataforma.

### **Não-Escopo**

Algumas funcionalidades foram deixadas fora do escopo inicial, pois demandam mais tempo de desenvolvimento ou maior complexidade técnica. Elas serão implementadas em fases posteriores:

- **Funcionalidade de inscrição para notificações**: Permitir que usuários se inscrevam para receber notificações sobre eventos próximos.
    - **Motivo para exclusão**: A implementação de um sistema de notificações eficiente envolve integrações complexas com serviços de envio de mensagens e maior carga de processamento em tempo real, o que exigiria um esforço técnico adicional que não se encaixa no cronograma de entrega atual.
- **Envio de lembretes para eventos**: Enviar lembretes para eventos marcados como "interesse" pelos usuários.
    - **Motivo para exclusão**: Embora valiosa, essa funcionalidade envolve a implementação de um sistema de tracking de preferências e gerenciamento de lembretes automatizados, o que pode levar a problemas de performance sem uma estruturação adequada.
- **Promoção de eventos com anúncios patrocinados**: Permitir que organizadores promovam seus eventos na plataforma com anúncios pagos.
    - **Motivo para exclusão**: O desenvolvimento de um sistema de anúncios patrocinados, com integrações de pagamentos, seria mais complexo e exige um planejamento mais detalhado para garantir conformidade legal e um fluxo de receita estável.
- **Interação com Inteligência Artificial**: IA para interagir com visitantes e fornecer informações sobre eventos.
    - **Motivo para exclusão**: A implementação de uma IA requer um tempo maior de desenvolvimento e treinamento de modelos para garantir uma experiência satisfatória, além de maiores recursos tecnológicos.

Essas funcionalidades foram adiadas para garantir o lançamento dentro do prazo estipulado, focando inicialmente em funcionalidades essenciais e escaláveis.

### **Stakeholders**

- **Interno**:
    - **Equipe de desenvolvimento**: Será responsável por implementar as funcionalidades principais utilizando Vite, React, TypeScript e Firebase.
    - **Equipe de design e UX**: Encarregada de criar uma interface amigável e intuitiva tanto para visitantes quanto para organizadores.
    - **Equipe de marketing**: Focada na promoção da plataforma antes e após o lançamento, garantindo engajamento inicial.
    - **Administradores da plataforma**: Realizarão a moderação de conteúdo e garantirão que os eventos sigam as políticas da plataforma.
- **Externo**:
    - **Organizadores de eventos**: Serão os principais usuários do lado administrativo, cadastrando eventos e interagindo com o público.
    - **Visitantes**: Usuários finais que participarão dos eventos e interagirão com o conteúdo publicado na plataforma.
    - **Legislação e regulamentação**: A plataforma precisa se adequar à LGPD (Lei Geral de Proteção de Dados), garantindo a segurança e privacidade dos dados dos usuários.
    - **Entidades governamentais**: Parcerias potenciais para promover eventos culturais e econômicos, além de apoiar o desenvolvimento local.

### **Gerenciamento de Riscos**

- **Conformidade com a LGPD**: Risco de violar a legislação de proteção de dados ao lidar com informações pessoais de usuários (organizadores e visitantes). Para mitigar esse risco, será implementada uma política de privacidade clara e mecanismos de consentimento informados.
- **Sobrecarga do sistema durante grandes eventos**: A alta demanda de acessos simultâneos pode causar instabilidade na plataforma. O uso do Firebase e tecnologias escaláveis como Vite e React foi escolhido para suportar picos de tráfego.
- **Atraso no desenvolvimento de funcionalidades complexas**: Algumas funcionalidades podem demandar mais tempo que o previsto. O plano de contingência inclui priorizar funcionalidades core e postergar as de menor urgência para fases posteriores.
- **Engajamento insuficiente dos organizadores**: Se poucos organizadores aderirem inicialmente à plataforma, isso pode afetar o número de eventos cadastrados. Será desenvolvido um plano de marketing e incentivos para aumentar a adesão logo após o lançamento.
- **Segurança da plataforma**: Ataques cibernéticos ou falhas de segurança podem comprometer dados. O uso de práticas recomendadas de segurança, como autenticação robusta e criptografia, será fundamental para mitigar esse risco.

### **Prazos**

- **Duração do projeto**: 1 mês e 10 dias.
- **Entrega do MVP (Produto Mínimo Viável)**: Ao fim desse período, a plataforma estará pronta para o lançamento, com as funcionalidades descritas no escopo.
- **Próximas fases**: As funcionalidades adiadas serão priorizadas em sprints futuras, após o lançamento do MVP e a estabilização inicial da plataforma.
