# aNAOmate

`aNAOmate` is an web-based interface for controlling SoftBank's Aldebaran Nao (V5/V6) robots.

[Slidedeck](https://docs.google.com/presentation/d/1Xc7OqAw_QCwlj7EUV_w8caj6bt-i0rDLMv9rSqkYeyo/edit#slide=id.p)


## About the Project

## Prerequisites

## Installation

## Usage

## Editing aNAOmate




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

## Start Contributing
The guide for contributors can be found [here](https://github.com/QuinnyB/aNAOmate/blob/master/CONTRIBUTING.md). It covers everything you need to know to start contributing to `aNAOmate`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgements

The authors of this project would like to graciously acknowledge to continued support of the community.
