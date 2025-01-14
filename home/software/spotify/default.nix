{
  inputs,
  pkgs,
  ...
}: {
  imports = [
    inputs.spicetify-nix.homeManagerModules.default
  ];
  programs.spicetify = let
    spicePkgs = inputs.spicetify-nix.legacyPackages.${pkgs.system};
  in {
    enable = true;
    # theme = spicePkgs.themes.text;
    colorScheme = "CatppuccinMocha";

    enabledExtensions = with spicePkgs.extensions; [
      shuffle # shuffle+ (special characters are sanitized out of ext names)
      playlistIcons
      lastfm
    ];
  };
}
