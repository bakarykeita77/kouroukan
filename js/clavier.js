var clavier_nko = $('#clavier_nko');
var tr = $('#clavier_nko tr');
var td = $('#clavier_nko td');
var son = $('#audio');
var source_son = "";
var caractere = "";
var lettre = "";

var niveau = $('.niveau').html();

if( niveau == 1 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo), #clavier_nko span').css( 'display','none' ); }
if( niveau == 2 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .nasalisation), #clavier_nko span, #ߚ').css( 'display','none' ); }
if( niveau == 3 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .tons, .nasalisation, .wolosso), #clavier_nko span, #ߚ').css( 'display','none' ); }
if( niveau == 4 ) { $('#clavier_nko').css( 'display','block' ); }