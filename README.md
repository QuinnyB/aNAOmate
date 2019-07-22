# aNAOmate

`aNAOmate` is an web-based interface for controlling SoftBank's Aldebaran Nao (V5/V6) robots.

## Objectives

TODO()

## NAO Python SDK Communication on Windows

This repository uses a specific version of `pynaoqi` software. In order to use `pynaoqi`, download python version 2.7 (in the installer folder) using the Windows x86 MSI installer (NOT the 64 bit installer).
During the install, make sure that you select the option to add python to the system path, and make sure pip is selected (should be by default).
Install the python naoqi windows installer from the softbank website (in the installer folder). Ensure that python 2.7 is selected. (If it does not show up as an option, try restarting you computer. If still doesn't show up, then you may installed the 64 bit version.)

## NAO Python SDK Communication on OSX

As this repository uses a specific version of `pynaoqi` software, it is recommend that you use a system compatible with `pynaoqi-python2.7-2.1.4.13-mac64`. This is built and tested using a 64-bit MacBook Air and Python 2.7.

### Configure the Environment with Install Name Tool

```sh
# clone the repository
/usr/bin/python -m pip install --upgrade pip
/usr/bin/python -m pip install -r requirements.txt

# Ensure that the supporting files are decompressed
tar -xvzf pynaoqi-python2.7-2.1.4.13-mac64.tar.gz

# Update the boost / dynamic library paths
# install_name_tool
target_path="$PWD/pynaoqi-python2.7-2.1.4.13-mac64"
export PYTHONPATH=${PYTHONPATH}:${target_path}
export PATH=${PATH}:/Users/korymathewson/Library/Python/2.7/bin
export DYLD_LIBRARY_PATH=${DYLD_LIBRARY_PATH}:${target_path}

for lib in $target_path/*.dylib; do
  echo "Treating $lib"
  for boost_lib in $target_path/libboost*.dylib; do
    echo "Changing boost lib $boost_lib"
    install_name_tool -change $(basename $boost_lib) $boost_lib $lib
  done
done

for lib in $target_path/*.so; do
  echo "Treating $lib"
  for boost_lib in $target_path/libboost*.dylib; do
    echo "Changing boost lib $boost_lib"
    install_name_tool -change $(basename $boost_lib) $boost_lib $lib
  done
done

# Remove the path
rm -rf ${target_path}
```

# Getting and Installing Choreographe
# Register with UNLIMITED LICENSE KEY: 654e-4564-153c-6518-2f44-7562-206e-4c60-5f47-5f45
```sh
wget https://storage.googleapis.com/api-project-941639660937.appspot.com/choregraphe-suite-2.1.4.13-mac64-setup.dmg
```

## Start and Connect to Robot

To connect to the robot:

1. Plug in the robot and charge the battery.
2. Plug in an ethernet cable to the robots head to ensure that it is on the same local network as the laptop.
3. Push and hold the button on the front of the robots to power on.
4. Once robot is awake (it will make a wake-up sound), push the button twice to relax the robot into a safe resting position.
5. Push the front button once to get the name of the robot and the IP address.
6. Navigate to this IP address on the laptop (which is on the same network)
7. Log in to the robot admin with admin credentials (nao/nao).
8. Perform updates on the robot

## Install aNAOmate on Robot

## Access the aNAOmate interface

## Using the aNAOmate interface

## Behaviours

## Configure Development Environment

* Example behaviour

## Tests

```sh
TODO runscript for testing
```

## Authors

* **Quinn Boser** - [Website](#)
* **Riley Dawson** - [Website](#)
* **Kory Mathewson** - [Website](https://korymathewson.com)
* **Josh Whitney** - [Website](#)

See also the list of [contributors](https://github.com/QuinnyB/aNAOmate/contributors) who participated in this project.

## Start Contributing
The guide for contributors can be found [here](https://github.com/QuinnyB/aNAOmate/blob/master/CONTRIBUTING.md). It covers everything you need to know to start contributing to `aNAOmate`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgements

The authors of this project would like to graciously acknowledge to continued support of the community.

## References

* Example reference.
* https://www.cs.utexas.edu/~pstone/Courses/393Rfall13/resources/nao.html#care
* https://developer.softbankrobotics.com/nao6/naoqi-developer-guide/sdks/former-versions/qimessaging-javascript-10#js-1-0-migrate

