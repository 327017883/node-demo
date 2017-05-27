<template>
	<form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">账号</label>
      <div class="col-sm-10">
        <input type="input" class="form-control" id="input" placeholder="账号">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label>
            <input type="checkbox"> Remember me
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default" @tap='submit'>Sign in</button>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  created: () => {
    
  },
  methods: {
    submit (){
      
    }
  }
}
</script>

<style>

</style>