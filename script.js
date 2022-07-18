class TodoList {
    constructor(url, input, list) {
        this.url = url;
        this.$input = input;
        this.$list = list;

        $('body').on('click', '#create', () => {
            if (this.$input.val().length > 0) {
                this.addTodo(this.$input.val());
            }
        })

        $('body').on('click', '.set-status', (e) => {
            const id = $(e.target).closest('li').data('id');
            const status = $(e.target).closest('li').data('status');
            this.changeStatus(id, status);
        })

        $('body').on('click', '.delete-task', (e) => {
            const conf = confirm('Are you sure?');
            if (!conf) {
                return false;
            }

            this.removeTodo($(e.target).closest('li').data('id'));
        })
    }

    addTodo(task) {
        const data = JSON.stringify({
            task: task,
            complited: false
        });

        this.ajaxCall(this.url, 'POST', data, (res) => {
            const taskNode = this.createLiItem(res);
            this.$list.append(taskNode);
            this.$input.val('');
        });
    }

    removeTodo(id) {
        this.ajaxCall(this.url + `/${id}`, 'DELETE', '', (res) => {
            $(`[data-id="${id}"]`).remove();
        })
    }

    getTodos() {
        this.ajaxCall(this.url, null, null, (res) => {
           this.render(res);
        });
    }

    changeStatus(id, status) {
        this.ajaxCall(this.url + `/${id}`, 'PATCH', JSON.stringify({complited: !status}), (res) => {
            $(`[data-id="${id}"]`).toggleClass('done');
        })
    }

    render(todos) {
        let lis = '';
        for (const el of todos) {
            if (!el) {
                return;
            }

            lis += this.createLiItem(el);
        }

        this.$list.html(lis);
    }

    createLiItem(task) {
        const item = `<li class="${task.complited ? 'done' : ''}" data-id="${task.id}" data-status="${task.complited}">
                    ${task.id}. ${task.task}
                    <div class="btns">
                        <button class="btn btn-secondary btn-sm set-status">Change status</button> 
                        <button class="btn btn-danger btn-sm delete-task">Delete</button>
                    </div>
                    </li>`;

        return item;
    }

    ajaxCall(url, type, data, callback) {
        const params = {
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        };

        if (type) {
            params.type = type;
        }

        if (data) {
            params.data = data;
        }

        $.ajax(params)
            .done(result => callback(result))
            .fail(err => alert(err.statusText));
    }
}

const todo = new TodoList('http://localhost:3000/todos', $('#input'), $('#list'));
todo.getTodos();
