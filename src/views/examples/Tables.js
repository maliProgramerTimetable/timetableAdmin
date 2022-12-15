import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
import firebase from "../../firebase/firebase";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import Spinner from "components/Spinner/Spinner";

const Tables = () => {
  const [schools, setSchools] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const db = firebase.firestore();
  useEffect(() => {
    const schoolsList = async () => {
      let newSchools = [];
      db.collection("schools")
        .get()
        .then((snap) => {
          snap.docs.map((doc) => {
            newSchools.push(doc.data());
          });
          setSchools(newSchools);
          setIsLoaded(true);
        });
    };
    schoolsList();
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <Header />
          <Container className="mt--7" fluid>
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Lista škola</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Ime škole</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Adresa</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {schools?.map((school) => {
                        return (
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {school.userData.displayName}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>{school.userData.email}</td>
                            <td>
                              <span>{school.userData.adress}</span>
                            </td>

                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Uredi
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Izbriši
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Container>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Tables;
