MomentPicker [![Build Status](https://travis-ci.org/coma/MomentPicker.png?branch=master)](https://travis-ci.org/coma/MomentPicker)
============

A datepicker based on Moment.js and jQuery

How to use
----------

Using moment picker is as simple as:

Create a file called index.html and add the next code:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>MomentPicker</title>
        <link rel="stylesheet" href="../dist/MomentPicker.css">
    </head>
    <body>
        <div id="picker" class="picker"></div>
        <script src="../bower_components/jquery/jquery.js"></script>
        <script src="../bower_components/momentjs/moment.js"></script>
        <script src="../dist/MomentPicker.min.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

Then add a new file main.js and add this other javascript code will be used to generate the MomentPicker:
```javascript
$(function() {
    $('#basic').MomentPicker();
});
```

