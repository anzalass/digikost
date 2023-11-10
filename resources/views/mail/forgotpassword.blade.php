<!doctype html>
<html>

<body>
    <h1>FORGOT PASSWORD</h1>
    <p>Hello {{$user->first_name}}</p>
    <p>Please click the below button to verify your email address</p>
    <a href="{{URL::temporarySignedRoute('verification.verify', now()->addMinutes(30), ['id' => $user->id])}}"
        class="button button-primary">Click To Verify</a>
</body>

</html>