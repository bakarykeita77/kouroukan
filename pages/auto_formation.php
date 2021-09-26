<!DOCTYPE html>
<!DOCTYPE html>
<html>

<head>
	<title>alphabet</title>
	<meta charset="utf-8"/>

    <style type="text/css">
        <?php include 'css/auto_formation.css'; ?>
    </style>

</head>

<body>
	
<div id="pratiques">
	<div id="bouton">
		<div id="tab">
			<div class="img"><img src="image/b.jpg"/></div>
			<div class="cmt"><p>Aide d'utilisation du tableau</p></div>
		</div>

		<hr>

		<div id="ex">
			<div class="img"><img src="image/m2.jpg"/></div>
			<div class="cmt"><p>Comment utiliser exercices</p></div>
		</div>

		<hr>

		<button id="btn_m">Masquer</button>
	</div>

		<div id="alphabet_nko">

			<div>
				<h1 id="alphabet" class="titre_lettres">ߒߞߏ ߛߓߍߛߎ߲</h1><hr>
				<div class="cadre">
					<table class="table">
						<tr>
							<td id='a'>ߊ</td>			
							<td id='e'>ߋ</td>
							<td id='i'>ߌ</td>
							<td id='ee'>ߍ</td>
							<td id='u'>ߎ</td>
							<td id='o'>ߏ</td>
							<td id='oo'>ߐ</td>
						</tr>
					</table>
				
					<table class="t">
						<tr>
							<tH><h4 id="voyelle">ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬</h4></tH>
						</tr>
					</table>
				</div>	
				<div class="cadre">
					<table class="table">
						<tr>
							<td id='b'>ߓ</td>
							<td id='p'>ߔ</td>
		                    <td id='t'>ߕ</td>
							<td id='dj'>ߖ</td>
							<td id='ty'>ߗ</td>
							<td id='d'>ߘ</td>
							<td id='r'>ߙ</td>	     
						</tr>
						<tr>
		                    <td id='rr'>ߚ</td>
							<td id='s'>ߛ</td>
							<td id='gb'>ߜ</td>
							<td id='f'>ߝ</td>
							<td id='k'>ߞ</td>
							<td id='l'>ߟ</td>
							<td id='m'>ߡ</td>
						</tr>
						<tr>
		                    <td id='ny'>ߢ</td>
							<td id='n'>ߣ</td>		
							<td id='h'>ߤ</td>
							<td id='w'>ߥ</td>
							<td id='y'>ߦ</td>
						</tr>
					</table>
					
					<table class="t">
						<tr>
							<th><h4 id="consonne">ߛߌ߬ߙߊ߬ߕߊ ߟߎ߬</h4></th>
						</tr>
					</table>
				</div>	
				<div class="cadre">
					<table class="table">
						<tr>
							<td id='nn'>ߒ</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</table>
					
					<table class="t">
						<tr>
							<th><h4 id="tedo">ߕߍߘߐ</h4></th>
						</tr>
					</table>
				</div>	
				<div class="cadre">
					<table class="table">
						<tr>
							<td id="zero">߀</td>
							<td id="un">߁</td>
							<td id="deux">߂</td>
							<td id="trois">߃</td>
							<td id="quatre">߄</td>
							<td id="cinq">߅</td>
							<td id="six">߆</td>
						</tr>
						<tr>
							<td id="sept">߇</td>
							<td id="huit">߈</td>
							<td id="neuf">߉</td>
						</tr>
				    </table>
					
					<table class="t">
						<tr>
							<th><h4 id="chiffre">ߖߊ߰ߕߋ߬ߘߋ߲ ߠߎ߬</h4></th>
						</tr>
					</table>
				</div>

				<audio id="son" src="sons/x.mp3"></audio>
			</div>

		</div>


	
	
		<div id="pratique">
			<div id="ecran" height="80%">
				<textarea name="texte" id="tableau"></textarea>			
			</div>


			<div id="clavier">
				<div id="boutons">
					<table cellpadding="2px" id="lettre">
						<tr id="voyelle">
							<td><button id="a" onclick="ecrire_a()">ߊ</button></td>
							<td><button id="e" onclick="ecrire_e()">ߋ</button></td>
							<td><button id="i" onclick="ecrire_i()">ߌ</button></td>
							<td><button id="ee" onclick="ecrire_ee()">ߍ</button></td>
							<td><button id="u" onclick="ecrire_u()">ߎ</button></td>
							<td><button id="o" onclick="ecrire_o()">ߏ</button></td>
							<td><button id="oo" onclick="ecrire_oo()">ߐ</button></td>
							<td><button id="nasalisation" onclick="ecrire_nasalisation()">߲</button></td>
							<td><button id="na" onclick="ecrire_na()">ߠ</button></td>
							<td><button id="nya" onclick="ecrire_nya()">ߧ</button></td>				
						</tr>

						<tr class="consonne">
							<td><button id="b" onclick="ecrire_b()">ߓ</button></td>
							<td><button id="p" onclick="ecrire_p()">ߔ</button></td>
							<td><button id="t" onclick="ecrire_t()">ߕ</button></td>
							<td><button id="j" onclick="ecrire_j()">ߖ</button></td>
							<td><button id="ty" onclick="ecrire_ty()">ߗ</button></td>
							<td><button id="d" onclick="ecrire_d()">ߘ</button></td>
							<td><button id="r" onclick="ecrire_r()">ߙ</button></td>		
							<td><button id="rr" onclick="ecrire_rr()">ߚ</button></td>
							<td><button id="s" onclick="ecrire_s()">ߛ</button></td>
							<td><button id="gb" onclick="ecrire_gb()">ߜ</button></td>
						</tr>

						<tr class="consonne">
							<td><button id="f" onclick="ecrire_f()">ߝ</button></td>
							<td><button id="k" onclick="ecrire_k()">ߞ</button></td>
							<td><button id="l" onclick="ecrire_l()">ߟ</button></td>
							<td><button id="m" onclick="ecrire_m()">ߡ</button></td>		
							<td><button id="ny" onclick="ecrire_ny()">ߢ</button></td>
							<td><button id="n" onclick="ecrire_n()">ߣ</button></td>
							<td><button id="h" onclick="ecrire_h()">ߤ</button></td>
							<td><button id="w" onclick="ecrire_w()">ߥ</button></td>
							<td><button id="y" onclick="ecrire_y()">ߦ</button></td>
							<td><button id="nn" onclick="ecrire_nn()">ߒ</button></td>
						</tr>

						<tr>
							<td colspan="2"><button id="ny" class="mini" onclick="ecrire_?()">ߖߐ߬ߛߌ߬ߙߊ߲</button></td>
							<td><button id="" onclick="ecrire_()"></button></td>
							<td><button id="h" onclick="ecrire_point()">.</button></td>
							<td colspan="2"><button id="w" class="mini" onclick="espace()">ߕߍߓߐߟߊ߲</button></td>
							<td><button id="interogation" onclick="ecrire_interogation()">?</button></td>
							<td><button id="lakiso" onclick="ecrire_lakiso()">ߴ</button></td>
							<td><button id="lasanti" onclick="ecrire_lasanti()">ߵ</button></td>
							<td><button id="virgule" onclick="ecrire_virgule()">߸</button></td>
						</tr>
					</table>

					<table  cellpadding="2px" id="phonetique">			
						<tr>
							<td><button id="kyl" onclick="ecrire_kyl()">߫</button></td>
							<td><button id="kdl" onclick="ecrire_kdl()">߬</button></td>
						</tr>
						<tr>
							<td><button id="i" onclick="ecrire_kdk()">߭</button></td>
							<td><button id="ee" onclick="ecrire_kyls()">߯</button></td>
						</tr>
						<tr>
							<td><button id="i" onclick="ecrire_kdls()">߰</button></td>
							<td><button id="e" onclick="ecrire_kyks()">߮</button></td>	
						</tr>
						<tr>
							<td><button id="ee" onclick="ecrire_kdks()">߱</button></td>
							<td><button id="a" onclick="ecrire_nasalisation()">߲</button></td>
						</tr>			
					</table>		
				</div>
			</div>
		</div>
</div>

	<script type="text/javascript">
		<?php include 'js/auto_formation.js'; ?>
	</script>
</body>			
</html>