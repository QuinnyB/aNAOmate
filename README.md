[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/QuinnyB/aNAOmate">
    <img src="src/images/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">aNAOmate</h3>

  <p align="center">
    A web-based interface for controlling SoftBank's Aldebaran Nao (V5/V6) robots.
    <br />
    <a href="https://github.com/QuinnyB/aNAOmate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/QuinnyB/aNAOmate/issues">Report Bug</a>
    ·
    <a href="https://github.com/QuinnyB/aNAOmate/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://QuinnyB.github.io/aNAOmate/)

`aNAOmate` is an web-based interface for controlling SoftBank's Aldebaran Nao (V5/V6) robots.

[Slidedeck](https://docs.google.com/presentation/d/1Xc7OqAw_QCwlj7EUV_w8caj6bt-i0rDLMv9rSqkYeyo/edit#slide=id.p)

### Built With

* [React](https://reactjs.org/)
* [Semantic UI](https://semantic-ui.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo
```sh
git clone https:://github.com/QuinnyB/aNAOmate.git
```
2. Install NPM packages
```sh
npm install
```

<!-- USAGE EXAMPLES -->
## Usage

<!--_For more examples, please refer to the [Documentation](https://example.com)_-->

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/QuinnyB/aNAOmate/issues) for a list of proposed features (and known issues).

## Editing TMI (Touch Move Interface for the Nao Robot)

1. Make changes in the `TMI` directory
2. Test the changes by following the quick testing instructions.
3. Once satisfied, ensure that all necessary files are linked in `TMI/TMI.pml`.
4. Once links are complete, open the `TMI/TMI.pml` in Choregraphe
5. `File -> Build Application Package` and save to the `package` directory.
6. Once the package is saved, install on the robot. (Note: NAOqi must be properly installed on your system for the installation script to work)

```sh
/usr/bin/python package/install_pkg.py $ROBOT_IP $PACKAGE_FILE_NAME
```

7. Once the package is installed, you will see: `Installation complete.` (This installs the application to `/home/nao/.local/share/PackageManager/apps/TMI` and runs the application if `autorun="true"` in the [TMI/manifest](https://github.com/QuinnyB/aNAOmate/blob/master/TMI/manifest.xml)
8. The application interface is now running, and starts automatically by default.
9. Navigate to `http://$ROBOT_IP/apps/TMI` to see developed the interface.
10. This interface should match the tested changes in Step 2.

## Using the aNAOmate interface

TODO

## Behaviours

TODO

## Configure Development Environment

TODO

## Authors

* **Quinn Boser** - [Website](#)
* **Riley Dawson** - [Website](#)
* **Josh Whitney** - [Website](#)
* **Kory Mathewson** - [Website](https://korymathewson.com)

See the list of [contributors](https://github.com/QuinnyB/aNAOmate/contributors) who participated in this project.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Josh Whitney - [@JoshJRWhitney](https://twitter.com/JoshJRWhitney) - joshjrwhitney@gmail.com

Project Link: [https://github.com/QuinnyB/aNAOmate](https://github.com/QuinnyB/aNAOmate)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

The authors of this project would like to graciously acknowledge to continued support of the community.




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/QuinnyB/aNAOmate.svg?style=flat-square
[contributors-url]: https://github.com/QuinnyB/aNAOmate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/QuinnyB/aNAOmate.svg?style=flat-square
[forks-url]: https://github.com/QuinnyB/aNAOmate/network/members
[stars-shield]: https://img.shields.io/github/stars/QuinnyB/aNAOmate.svg?style=flat-square
[stars-url]: https://github.com/QuinnyB/aNAOmate/stargazers
[issues-shield]: https://img.shields.io/github/issues/QuinnyB/aNAOmate.svg?style=flat-square
[issues-url]: https://github.com/QuinnyB/aNAOmate/issues
[license-shield]: https://img.shields.io/github/license/QuinnyB/aNAOmate.svg?style=flat-square
[license-url]: https://github.com/QuinnyB/aNAOmate/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/josh-whitney-1b2241b4/
[product-screenshot]: https://user-images.githubusercontent.com/22296749/67176047-b686d380-f385-11e9-8a8c-473565b21551.png
