// sarafan --help (-h)
// sarafan --version (-v)
// sarafan --verbose

// sarafan - deploy default project
// sarafan deploy - deploy default project
// sarafan cleanup - clean up all releases
// sarafan history - display all deployments
// sarafan rollback - rollback to previous version
// По умолчанию выполняются комманды для серверов по умолчанию, можно указать
// и кокретный сервер, например:
//    sarafan deploy:tests
//    sarafan history:tests

// Если в описании коммита написать #nodeploy развертывание производиться не
// будет

// Структура директорий проекта
// [root]
// [root]/releases/20121125003142
// [root]/releases/20121115001122
// [root]/releases/...
// [root]/shared
// [root]/current -> [root]/releases/20121125003142

module.exports = function(sarafan) {
  sarafan.initConfig({
    repository: {
      type: 'git',
      url: 'git@github.com/capistrano/capistrano.git',
      username: '',
      password: ''
    },

    defaults: ['tests', 'productions'],

    deploy: {
      tests: {
        description: 'Deploy to test server',

        ssh: [
          {
            ip: '127.0.0.1',
            port: '22',
            username: 'root',
            password: '',
            path: '/data/www/sixt.ua/'
          }
        ],
        // or
        ssh: ['ssh root@127.0.0.1 -p22'],
        // or
        ssh: 'ssh root@127.0.0.1 -p22',
        // or 
        ssh: function(){},

        shared: [
          'static-servers/s1.sixt.ua/uploads'
        ],

        build: {
          minify: {
            grunt: ['mincss', 'minjs', 'mintpl'],
            skeep_fail: false,
            error: function(err) {
            },
            success: function() {
            }
          },

          test: {
            grunt: ['phpunit', 'jasmin']
          }
        },

        proccess: [
          'backup_db',
          'maintenance true',
          'update_db',
          'update',
          'clear_memcached',
          'maintenance false'
        ],

        error: {
          'restore_db': ['update_db'],
          'maintenance false': ['update_db', 'update']
        },
        // or
        error: 'error_handler',
        // or
        error: function(err) {
          
        },

        success: ['send_report'],
        // or
        success: function() {

        }
      }, 
      
      productions: {
        description: 'Deploy to production servers',

        basis: 'tests',

        ssh: 'ssh root@127.0.0.1 -p22',

        exclude: ['public/css/*.css'],
        // or
        exclude: 'public/css/*.css',

        success: false
      }
    }
  });

  sarafan.addTask('maintenance', 'Перевод сайта в режим "Технические работы" и обратно',
    function(turn_on){
    }
  );
};
