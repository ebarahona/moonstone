enyo.kind({
	name: "moon.sample.IconButtonSample",
	kind: "FittableRows",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{fit:true, components: [
<<<<<<< HEAD
			{kind: "moon.Divider", content: "Font-based Icon Buttons:"},
			{kind: "moon.IconButton", icon: "drawer", small: false, ontap: "buttonTapped"},
			{kind: "moon.IconButton", icon: "zoom", small: false, ontap: "buttonTapped"},
			{kind: "moon.IconButton", icon: "drawer", ontap: "buttonTapped"},
			{kind: "moon.IconButton", icon: "zoom", ontap: "buttonTapped"},
			{classes:"moon-1v"},
			{kind: "moon.Divider", content: "Image Asset Icon Buttons:"},
			{kind: "moon.IconButton", src: "assets/icon-list.png", small: false, ontap: "buttonTapped"},
			{kind: "moon.IconButton", src: "assets/icon-album.png", small: false, ontap: "buttonTapped"},
			{kind: "moon.IconButton", src: "assets/icon-list.png", ontap: "buttonTapped"},
			{kind: "moon.IconButton", src: "assets/icon-album.png", ontap: "buttonTapped"},
			{classes:"moon-1v"},
			{kind: "moon.Divider", content: "Disabled Icon Buttons:"},
			{kind: "moon.IconButton", icon: "drawer", small: false, ontap: "buttonTapped", disabled: true},
			{kind: "moon.IconButton", icon: "zoom", ontap: "buttonTapped", disabled: true},
			{kind: "moon.IconButton", src: "assets/icon-list.png", small: false, ontap: "buttonTapped", disabled: true},
			{kind: "moon.IconButton", src: "assets/icon-album.png", ontap: "buttonTapped", disabled: true},
			{classes:"moon-1v"},
			{kind: "moon.Divider", content: "Grouped Icon Buttons:"},
			{kind: "enyo.Group", components: [
				{kind: "moon.IconButton", icon: "drawer", ontap: "buttonTapped"},
				{kind: "moon.IconButton", icon: "zoom", ontap: "buttonTapped"},
				{kind: "moon.IconButton", src: "assets/icon-list.png", ontap: "buttonTapped"},
				{kind: "moon.IconButton", src: "assets/icon-album.png", ontap: "buttonTapped"}
			]}
=======
			{kind: "moon.Divider", content: "Icon Buttons:"},
			{kind: "moon.IconButton", src: "./assets/icon-list.png", ontap: "buttonTapped"},
			{kind: "moon.IconButton", src: "./assets/icon-list.png", ontap: "buttonTapped"},
			{tag: "br"},
			{tag: "br"},
			{kind: "moon.Divider", content: "Deactivated Icon Buttons:"},
			{kind: "moon.IconButton", src: "./assets/icon-list.png", ontap: "buttonTapped", disabled: true},
			{kind: "moon.IconButton", src: "./assets/icon-list.png", ontap: "buttonTapped", disabled: true}
>>>>>>> origin/GF-42322-brookepeterson
		]},
		{kind: "moon.Divider", content: "Result"},
		{kind: "moon.BodyText", name:"console", content: "No changes yet"}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.console.setContent(inSender.name + " tapped.");
	}
});
